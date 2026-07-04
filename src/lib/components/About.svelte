<script>
  import SectionHeading from './SectionHeading.svelte';
  import AboutIcon from './AboutIcon.svelte';
  import { about, aboutIntro, stats } from '../content.js';

  const linkClass = 'inline-flex items-baseline gap-1 text-sky underline-offset-4 transition-colors hover:text-sky-bright hover:underline';
</script>

<section id="about" class="relative border-t border-hair/60 bg-ink py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="01"
      kicker="About"
      title="One room, a pile of nodes, and the whole ecosystem."
    />

    <p class="-mt-8 mb-12 max-w-2xl text-lg leading-relaxed text-mist">
      {#each aboutIntro as part}
        {#if part.href}
          <a class={linkClass} href={part.href} target="_blank" rel="noreferrer">
            {part.text}
            <span class="text-xs" aria-hidden="true">↗</span>
          </a>
        {:else}
          {part.text}
        {/if}
      {/each}
    </p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each about as card}
        <article
          class="group rounded-2xl border border-hair/70 bg-panel/60 p-7 transition-colors hover:border-sky/40"
        >
          <div class="mb-5 inline-flex rounded-xl border border-hair/70 bg-sky/10 p-3 text-sky transition-colors group-hover:border-sky/40">
            <AboutIcon name={card.icon} class="h-6 w-6" />
          </div>
          <h3 class="text-xl font-semibold text-white">{card.title}</h3>
          <p class="mt-3 leading-relaxed text-mist">
            {#if Array.isArray(card.body)}
              {#each card.body as part}
                {#if part.href}
                  <a class={linkClass} href={part.href} target="_blank" rel="noreferrer">
                    {part.text}
                    <span class="text-xs" aria-hidden="true">↗</span>
                  </a>
                {:else}
                  {part.text}
                {/if}
              {/each}
            {:else}
              {card.body}
            {/if}
          </p>
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
