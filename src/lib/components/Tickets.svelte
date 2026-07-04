<script>
  import Wordmark from './Wordmark.svelte';
  import { conf } from '../content.js';
</script>

<section id="tickets" class="relative overflow-hidden border-t border-hair/60 bg-void py-28 sm:py-36">
  <!-- concentric signal rings -->
  <div class="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2">
    {#each [200, 340, 480, 640] as r, i}
      <span
        class="absolute rounded-full border border-sky/20"
        style="width:{r}px;height:{r}px;left:{-r / 2}px;top:{-r / 2}px;opacity:{0.5 - i * 0.1}"
      ></span>
    {/each}
  </div>

  <div class="relative mx-auto max-w-3xl px-6 text-center">
    <p class="text-sm uppercase tracking-[0.3em] text-sky">{conf.dates}</p>
    <h2 class="mt-6 text-4xl font-semibold text-white sm:text-6xl">
      Join the mesh at
    </h2>
    <div class="mt-3">
      <Wordmark size="text-5xl sm:text-7xl" />
    </div>
    <p class="mx-auto mt-6 max-w-xl text-lg text-mist">
      Tickets launch summer 2026. Drop your email and we'll let you know when they're live.
    </p>

    <div class="mt-10 flex flex-wrap justify-center gap-4">
      <span
        class="inline-flex cursor-not-allowed items-center gap-3 rounded-xl bg-sky/20 px-8 py-4 text-lg font-semibold text-sky/50"
        aria-disabled="true"
      >
        Get Tickets — coming summer 2026
      </span>
      <a
        href={conf.repoUrl}
        class="inline-flex items-center gap-3 rounded-xl border border-hair px-8 py-4 text-lg font-semibold text-fog transition-colors hover:border-sky/50 hover:text-white"
      >
        Star on GitHub
      </a>
    </div>
  </div>
</section>
