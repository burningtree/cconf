<script>
  /**
   * LoRa transmitter panel (right side of the hero): a live TX monitor plus the
   * BW / SF / CR / Payload controls that drive the broadcast. The monitor is
   * clocked off the same `broadcastTiming` + `performance.now()` as the WebGL
   * waves, so "TRANSMITTING" lines up with a burst actually leaving the tower.
   */
  import { BW_OPTIONS, SF_OPTIONS, CR_OPTIONS, PAYLOAD_OPTIONS, broadcastTiming, simTime } from '../lora.js';
  import { fmtDuration, fmtRate } from '../format.js';
  import LoraSelect from './LoraSelect.svelte';
  import Waterfall from './Waterfall.svelte';

  let {
    bw = $bindable(),
    sf = $bindable(),
    cr = $bindable(),
    payload = $bindable(),
    profile
  } = $props();

  const bwItems = BW_OPTIONS.map((o) => ({ value: String(o), label: String(o) }));
  const sfItems = SF_OPTIONS.map((o) => ({ value: String(o), label: `SF${o}` }));
  const crItems = CR_OPTIONS.map((o) => ({ value: o, label: o }));
  const plItems = PAYLOAD_OPTIONS.map((o) => ({ value: String(o), label: `${o} B` }));

  let timing = $derived(profile ? broadcastTiming(profile) : { period: 3.6, airtime: 0.6 });

  // Live clock, ticked each frame off the shared broadcast timing.
  let phase = $state(0); // seconds into the current period
  let pkt = $state(0); // transmitted-packet counter
  let txing = $state(false);

  $effect(() => {
    let raf;
    const loop = (now) => {
      const t = simTime(now);
      if (t < 0) {
        phase = 0;
        txing = false;
        pkt = 0;
      } else {
        phase = t % timing.period;
        txing = phase < timing.airtime;
        pkt = Math.floor(t / timing.period);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });

  let progress = $derived(txing ? Math.min(1, phase / timing.airtime) : 0);
  let realMs = $derived(Math.round(timing.airtime * 1000));
  let elapsedMs = $derived(Math.round(progress * realMs));
  let totalSym = $derived(profile?.totalSymbols ?? 0);
  let sentSym = $derived(Math.round(progress * totalSym));
</script>

<div class="absolute bottom-4 right-4 z-20 hidden items-end gap-2 font-mono text-[11px] text-mist lg:flex">
  <!-- Monitor + waterfall (left of the controls box) -->
  <div class="w-52 select-none rounded-lg border border-hair/80 bg-void/55 px-2.5 py-2 backdrop-blur-md">
    <div class="flex items-center justify-between text-[9px] uppercase tracking-widest">
      <span class="flex items-center gap-1.5 {txing ? 'text-sky' : 'text-mist/50'}">
        <span
          class="inline-block h-1.5 w-1.5 rounded-full {txing
            ? 'animate-pulse bg-sky shadow-[0_0_6px_var(--color-sky)]'
            : 'bg-mist/40'}"
        ></span>
        {txing ? 'Transmitting' : 'Idle'}
      </span>
      <span class="text-mist/50">#{pkt}</span>
    </div>

    <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-hair/70">
      <div class="h-full rounded-full {txing ? 'bg-sky' : 'bg-mist/25'}" style="width:{progress * 100}%"></div>
    </div>
    <div class="mt-1 flex justify-between text-[10px] text-mist/60">
      <span class="tabular-nums">{sentSym}/{totalSym} sym</span>
      <span class="tabular-nums text-mist/80">
        {#if txing}{elapsedMs}/{realMs} ms{:else}last {realMs} ms{/if}
      </span>
    </div>

    <div class="mt-2"><Waterfall {profile} /></div>
  </div>

  <!-- Transmitter controls + derived telemetry (right box) -->
  <div class="w-48 select-none rounded-lg border border-hair/80 bg-void/55 px-2.5 py-2 backdrop-blur-md">
    <div class="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-mist/60">
      <span class="inline-block h-1.5 w-1.5 rounded-full bg-sky"></span>
      Tower · omni
    </div>
    <div class="grid grid-cols-2 gap-1.5">
      <LoraSelect label="BW kHz" items={bwItems} bind:value={bw} min="100%" />
      <LoraSelect label="SF" items={sfItems} bind:value={sf} min="100%" />
      <LoraSelect label="Coding" items={crItems} bind:value={cr} min="100%" />
      <LoraSelect label="Payload" items={plItems} bind:value={payload} min="100%" />
    </div>
    {#if profile}
      <dl class="mt-2 space-y-0 border-t border-hair/60 pt-1.5 text-[10px]">
        <div class="flex justify-between"><dt class="text-mist/60">Symbol</dt><dd class="text-fog">{fmtDuration(profile.tSym)}</dd></div>
        <div class="flex justify-between"><dt class="text-mist/60">Bit rate</dt><dd class="text-fog">{fmtRate(profile.bitrate)}</dd></div>
        <div class="flex justify-between"><dt class="text-mist/60">Airtime</dt><dd class="text-sky">{fmtDuration(profile.airtime)}</dd></div>
      </dl>
    {/if}
  </div>
</div>
