<script>
  import SectionHeading from './SectionHeading.svelte';
  import { about, aboutIntro, stats } from '../content.js';
</script>

<section id="about" class="relative border-t border-hair/60 bg-ink py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="01"
      kicker="About"
      title="Where the mesh ecosystem meets."
    />

    <p class="-mt-8 mb-12 max-w-2xl text-lg leading-relaxed text-mist">{aboutIntro}</p>

    <div class="grid gap-6 md:grid-cols-3">
      {#each about as card}
        <article
          class="group rounded-2xl border border-hair/70 bg-panel/60 p-7 transition-colors hover:border-sky/40"
        >
          <div class="mb-5 h-1 w-10 rounded-full bg-sky/70 transition-all group-hover:w-16"></div>
          <h3 class="text-xl font-semibold text-white">{card.title}</h3>
          <p class="mt-3 leading-relaxed text-mist">{card.body}</p>
        </article>
      {/each}
    </div>

    <dl class="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair/70 bg-hair/70 lg:grid-cols-4">
      {#each stats as s}
        <div class="bg-ink p-7">
          <dt class="flex items-baseline gap-2">
            <span class="wordmark text-4xl text-white">{s.value}</span>
            <span class="text-sm uppercase tracking-wide text-sky">{s.unit}</span>
          </dt>
          <dd class="mt-2 text-sm leading-snug text-mist">{s.label}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>
