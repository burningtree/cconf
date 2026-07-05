<script>
  import SectionHeading from './SectionHeading.svelte';
  import { conf, hardware } from '../content.js';
</script>

<section id="hardware" class="border-t border-hair/60 bg-ink py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="04"
      kicker="Hardware"
      title="Hardware on the table."
    />

    <p class="-mt-8 mb-12 max-w-2xl text-lg leading-relaxed text-mist">
      A pile of nodes, radios and gadgets to get your hands on — compare boards,
      flash firmware and watch packets fly across the room. Bring your own gear too.
    </p>

    <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each hardware as item}
        {@const Tag = item.href ? 'a' : 'div'}
        <li>
          <svelte:element
            this={Tag}
            href={item.href}
            target={item.href && !item.href.startsWith('mailto') ? '_blank' : undefined}
            rel={item.href && !item.href.startsWith('mailto') ? 'noreferrer' : undefined}
            class="group flex h-full flex-col rounded-2xl border border-hair/70 bg-ink p-6 transition-colors hover:border-sky/40 hover:bg-panel/60"
          >
            <div class="flex items-baseline justify-between gap-3">
              <span class="text-xs uppercase tracking-[0.18em] text-sky/75">{item.category}</span>
              {#if item.href}
                <span class="text-mist transition group-hover:text-sky" aria-hidden="true">↗</span>
              {/if}
            </div>

            <h3 class="mt-3 text-lg font-semibold text-white group-hover:text-sky">{item.name}</h3>
            {#if item.chip}
              <p class="mt-1 font-mono text-xs text-mist">{item.chip}</p>
            {/if}
            <p class="mt-3 text-sm leading-relaxed text-mist">{item.description}</p>
          </svelte:element>
        </li>
      {/each}
    </ul>

    <p class="mt-12 text-mist">
      Bringing something interesting?
      <a href="mailto:{conf.email}" class="text-sky underline-offset-4 hover:underline">{conf.email}</a>
    </p>
  </div>
</section>
