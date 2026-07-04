<script>
  import SectionHeading from './SectionHeading.svelte';
  import { conf, sponsors } from '../content.js';
</script>

<section id="sponsors" class="border-t border-hair/60 bg-void py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="04"
      kicker="Sponsors"
      title="Back an open, non-profit conference."
    />

    <p class="-mt-8 max-w-xl text-lg leading-relaxed text-mist">
      COREconf is community-run and not-for-profit. We’re looking for companies
      and projects in mesh, radio and open hardware who want to keep tickets
      affordable and the workshops free. In return you get a genuinely technical
      audience of builders and operators.
    </p>

    {#if sponsors.items?.length}
      <div class="mt-12">
        <p class="mb-5 text-sm uppercase tracking-[0.2em] text-sky/80">Example sponsors</p>
        <ul class="grid gap-px overflow-hidden rounded-2xl border border-hair/70 bg-hair/70 sm:grid-cols-3">
          {#each sponsors.items as sponsor}
            <li class="group bg-ink p-5 transition-colors hover:bg-panel/70">
              <div class="grid h-52 place-items-center rounded-xl border border-hair/70 bg-white p-4 sm:h-56">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  loading="lazy"
                  class="h-40 w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 sm:h-44"
                />
              </div>
              <div class="mt-5">
                <h3 class="text-lg font-semibold text-white">{sponsor.name}</h3>
                <p class="mt-1 text-xs uppercase tracking-[0.18em] text-sky/75">{sponsor.focus}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="mt-10">
      <a
        href="mailto:{conf.email}"
        class="inline-flex items-center gap-3 rounded-xl border border-sky/50 px-7 py-4
          text-lg font-semibold text-white transition-colors hover:bg-sky/10"
      >
        Become a sponsor <span class="text-sky">↗</span>
      </a>
    </div>
  </div>
</section>
