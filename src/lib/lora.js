// Minimal LoRa time-on-air math (Semtech SX127x/SX126x reference formula),
// matching the MeshCore Airtime Calculator. Self-contained so the hero can
// drive its radio simulation without external deps.

/** LoRa symbol duration in seconds: Tsym = 2^SF / BW. */
export function symbolTime(sf, bwHz) {
  return Math.pow(2, sf) / bwHz;
}

/** MeshCore firmware preamble length: SF5–SF8 use 32 symbols, SF9–SF12 use 16. */
export function meshCorePreamble(sf) {
  return Number(sf) <= 8 ? 32 : 16;
}

/** Coding-rate "4/5".."4/8" → cr offset 1..4. */
export function crFromString(s) {
  const m = /^\s*4\s*\/\s*([5-8])\s*$/.exec(String(s ?? ''));
  return m ? Number(m[1]) - 4 : 1;
}

/** Effective LoRa bit rate: Rb = SF · (BW / 2^SF) · (4 / (4+CR)). */
export function bitRate(sf, bwHz, cr) {
  return sf * (bwHz / Math.pow(2, sf)) * (4 / (4 + cr));
}

/**
 * Derive everything the simulator needs from a MeshCore radio config.
 * @param {number} bwKhz bandwidth in kHz (e.g. 62.5, 125, 250, 500)
 * @param {number} sf spreading factor 7..12
 * @param {string} crStr coding rate "4/5".."4/8"
 * @param {number} [payload] payload bytes (default 16 — a small MeshCore frame)
 */
export function loraProfile(bwKhz, sf, crStr, payload = 16) {
  const bwHz = bwKhz * 1000;
  const cr = crFromString(crStr);
  const tSym = symbolTime(sf, bwHz);
  const de = tSym > 0.016 ? 1 : 0; // low-data-rate optimize
  const preamble = meshCorePreamble(sf);

  const numerator = 8 * payload - 4 * sf + 28 + 16 /*crc*/ - 0 /*explicit header*/;
  const denominator = 4 * (sf - 2 * de);
  const payloadSymbols = 8 + Math.max(Math.ceil(numerator / denominator) * (cr + 4), 0);

  const symbolRate = bwHz / Math.pow(2, sf); // symbols per second
  const totalSymbols = preamble + payloadSymbols;
  const airtime = (preamble + 4.25) * tSym + payloadSymbols * tSym;

  return {
    bwHz,
    sf,
    cr,
    tSym,
    symbolRate,
    preamble,
    payloadSymbols,
    totalSymbols,
    airtime,
    bitrate: bitRate(sf, bwHz, cr),
    lowDataRate: de === 1
  };
}

// Shared simulation clock. Captured once at module load so every component
// (WebGL waves, monitor, waterfall) shares one epoch and stays in lock-step.
export const EPOCH = typeof performance !== 'undefined' ? performance.now() : 0;
export const START_DELAY = 1; // seconds of idle before the first packet

/** Simulation time in seconds; negative during the initial startup delay. */
export function simTime(nowMs) {
  return (nowMs - EPOCH) / 1000 - START_DELAY;
}

/**
 * Visual broadcast timing for the hero simulation, derived from a profile.
 * Shared by the WebGL waves and the TX monitor so they stay in lock-step.
 *   - cadence: symbol ripples per second (from symbol rate)
 *   - period:  seconds between packet starts
 *   - airtime: on-air (transmitting) duration within each period, scaled from
 *     the real time-on-air
 * Both components read `performance.now()`, so `now % period` is identical
 * across them regardless of mount order.
 */
export function broadcastTiming(profile) {
  // symbol ripple frequency stays compressed to a legible band (the real
  // symbol rate is hundreds/sec) — this is the visual "texture" of the wave.
  const cadence = Math.min(16, Math.max(2.2, profile.symbolRate / 45));
  // burst duration is the REAL time on air (1:1 seconds), so an 8 s packet
  // animates for a full 8 s. Tiny SF7 frames get a small floor to stay visible.
  const airtime = Math.max(0.12, profile.airtime);
  const gap = Math.min(3, Math.max(1.2, airtime * 0.4));
  return { cadence, period: airtime + gap, airtime };
}

export const BW_OPTIONS = [62.5, 125, 250, 500];
export const SF_OPTIONS = [7, 8, 9, 10, 11, 12];
export const CR_OPTIONS = ['4/5', '4/6', '4/7', '4/8'];
// PHY payload sizes (bytes): a MeshCore advert is ~16, a routed message larger.
export const PAYLOAD_OPTIONS = [8, 16, 32, 64, 128, 237];
