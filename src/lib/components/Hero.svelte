<script>
  import Wordmark from './Wordmark.svelte';
  import RFDistort from './RFDistort.svelte';
  import RFControls from './RFControls.svelte';
  import { conf } from '../content.js';
  import { loraProfile } from '../lora.js';

  const base = import.meta.env.BASE_URL;

  // LoRa transmitter config (MeshCore-style defaults) → radio profile.
  // Kept as strings for the bits-ui selects; converted for the math.
  let bw = $state('62.5');
  let sf = $state('7');
  let cr = $state('4/5');
  let payload = $state('64');
  let profile = $derived(loraProfile(Number(bw), Number(sf), cr, Number(payload)));
</script>

<section id="top" class="relative min-h-screen overflow-hidden bg-void">
  <!-- Backdrop image. Swap /static/backdrop.png to change it. -->
  <div class="absolute inset-0">
    <img
      src={`${base}backdrop.png`}
      alt=""
      aria-hidden="true"
      class="h-full w-full object-cover object-right contrast-115"
      onerror={(e) => (e.currentTarget.src = `${base}hero.svg`)}
    />
    <!-- WebGL layer: LoRa broadcast waves warp the backdrop pixels -->
    <RFDistort {profile} />
    <!-- Left-to-right fade so text stays readable over any image -->
    <div class="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/10"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40"></div>
  </div>

  <!-- LoRa monitor + waterfall + transmitter controls (bottom-right cluster) -->
  <RFControls bind:bw bind:sf bind:cr bind:payload {profile} />

  <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-16 lg:px-10">
    <div class="max-w-2xl">
      <div class="rise flex items-center gap-3 text-3xl" style="animation-delay: 0ms">
        <span class="font-semibold text-sky">{conf.edition}</span>
        <span class="text-mist">/ {conf.year}</span>
      </div>
      <div class="rise mt-4 h-px w-16 bg-hair" style="animation-delay: 60ms"></div>

      <h1 class="rise mt-8" style="animation-delay: 120ms">
        <Wordmark size="text-6xl sm:text-7xl lg:text-8xl" />
        <span class="mt-1 block font-sans text-5xl font-light text-sky sm:text-6xl lg:text-7xl">
          {conf.city}
        </span>
      </h1>

      <div class="rise mt-6 h-px w-16 bg-hair" style="animation-delay: 180ms"></div>

      <p class="rise mt-8 space-y-1 text-2xl font-light leading-snug sm:text-3xl" style="animation-delay: 240ms">
        {#each conf.tagline as line, i}
          <span class="block {i === 0 ? 'text-white' : 'text-mist'}">{line}</span>
        {/each}
      </p>

      <div class="rise mt-10 flex flex-wrap items-center gap-4" style="animation-delay: 320ms">
        <a
          href={conf.ticketUrl}
          class="group inline-flex items-center gap-3 rounded-xl border border-sky/50 px-7 py-4
            text-lg font-semibold text-white transition-all hover:border-sky hover:bg-sky/10"
        >
          <span class="text-sky transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          Get Tickets
        </a>
        <a
          href="#about"
          class="inline-flex items-center gap-2 px-2 py-4 text-lg text-mist transition-colors hover:text-white"
        >
          What is this?
        </a>
      </div>
    </div>
  </div>

  <!-- scroll cue -->
  <a
    href="#about"
    class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-mist md:flex"
  >
    Scroll
    <span class="block h-8 w-px animate-pulse bg-gradient-to-b from-sky to-transparent"></span>
  </a>
</section>
