<script>
  /**
   * Compact horizontal waterfall spectrum strip. Time scrolls right→left; the
   * vertical axis is frequency across the 868 MHz band. Noise floor always
   * speckles; while the tower is on-air the channel bandwidth lights up with
   * LoRa chirps sweeping across it. Embedded in the monitor panel and clocked
   * off the same `broadcastTiming` + `performance.now()` as everything else.
   */
  import { broadcastTiming, simTime } from '../lora.js';

  /** @type {{ symbolRate:number, airtime:number, bwHz:number }} */
  let { profile } = $props();

  let canvas;
  const W = 220, H = 36; // internal pixel grid (x = time, y = frequency)
  const SPAN_KHZ = 500;

  $effect(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#070c14';
    ctx.fillRect(0, 0, W, H);

    let raf;
    let lastCol = 0;
    const render = (now) => {
      const t = simTime(now);
      const timing = profile ? broadcastTiming(profile) : { period: 3.6, airtime: 0.6, cadence: 8 };
      const txing = t >= 0 && t % timing.period < timing.airtime;

      // advance ~1 column every 26ms, scrolling left
      if (now - lastCol > 26) {
        lastCol = now;
        ctx.drawImage(canvas, 1, 0, W - 1, H, 0, 0, W - 1, H);

        const x = W - 1;
        ctx.fillStyle = '#070c14';
        ctx.fillRect(x, 0, 1, H);

        // noise floor
        for (let y = 0; y < H; y++) {
          const n = Math.random();
          if (n > 0.8) {
            ctx.fillStyle = `rgba(90,120,150,${(n - 0.8) * 0.45})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }

        if (txing && profile) {
          const bwK = profile.bwHz / 1000;
          const bandH = Math.max(4, Math.min(H, (bwK / SPAN_KHZ) * H));
          const bs = H * 0.5 - bandH / 2;

          ctx.fillStyle = 'rgba(78,195,239,0.16)';
          ctx.fillRect(x, bs, 1, bandH);

          const c1 = (t * timing.cadence) % 1;
          const c2 = (t * timing.cadence + 0.5) % 1;
          ctx.fillStyle = 'rgba(190,228,250,0.95)';
          ctx.fillRect(x, bs + c1 * bandH, 1, 2);
          ctx.fillStyle = 'rgba(122,212,245,0.7)';
          ctx.fillRect(x, bs + c2 * bandH, 1, 1);
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  });
</script>

<div>
  <div class="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-mist/40">
    <span>Waterfall</span>
    <span>868.4</span>
  </div>
  <canvas
    bind:this={canvas}
    width={W}
    height={H}
    class="h-8 w-full rounded"
    style="image-rendering: pixelated"
    aria-hidden="true"
  ></canvas>
</div>
