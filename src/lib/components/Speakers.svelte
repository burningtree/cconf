<script>
  import SectionHeading from './SectionHeading.svelte';
  import RippleOverlay from './RippleOverlay.svelte';
  import { conf } from '../content.js';
  import people from '../speakers.yaml';

  function initials(name) {
    return name
      .replace(/[^\p{L}\s]/gu, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  }
</script>

<section id="speakers" class="border-t border-hair/60 bg-ink py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="02"
      kicker="People"
      title="Who's coming."
    />
    <p class="-mt-8 mb-12 max-w-xl text-mist">
      A first wave of the people building the mesh — firmware authors, app makers and
      hardware hackers. The line-up grows as the CFP fills up.
    </p>

    <ul class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {#each people as p}
        {@const Tag = p.link ? 'a' : 'div'}
        <li>
          <svelte:element
            this={Tag}
            href={p.link}
            target={p.link && !p.link.startsWith('mailto') ? '_blank' : undefined}
            rel={p.link && !p.link.startsWith('mailto') ? 'noreferrer' : undefined}
            class="group block"
          >
            <div
              class="relative aspect-square overflow-hidden rounded-2xl border border-hair/70
                {p.cta ? 'border-dashed border-sky/50 bg-sky/5' : 'bg-panel'}"
            >
              {#if p.avatar}
                <img
                  src={p.avatar}
                  alt={p.name}
                  loading="lazy"
                  class="h-full w-full object-cover grayscale transition-all duration-500
                    group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent"></div>
              {:else if p.cta}
                <div class="grid h-full w-full place-items-center text-sky">
                  <span class="text-5xl font-light">+</span>
                </div>
              {:else}
                <div class="grid h-full w-full place-items-center">
                  <span class="wordmark text-4xl text-mist">{initials(p.name)}</span>
                </div>
              {/if}

              <RippleOverlay />

              {#if p.link}
                <span
                  class="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-lg
                    bg-void/60 text-sky opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >↗</span>
              {/if}
            </div>

            <div class="mt-3">
              <div class="font-semibold text-white group-hover:text-sky {p.cta ? 'text-sky' : ''}">
                {p.name}{#if p.handle}&nbsp;<span class="font-normal text-mist">(@{p.handle})</span>{/if}
              </div>
              <p class="mt-0.5 text-sm text-sky/80">{p.role}</p>
              {#if p.bio}
                <p class="mt-2 text-sm leading-relaxed text-mist">{p.bio}</p>
              {/if}
            </div>
          </svelte:element>
        </li>
      {/each}
    </ul>

    <p class="mt-12 text-mist">
      Want to speak? The call for proposals is open —
      <a href="mailto:{conf.email}" class="text-sky underline-offset-4 hover:underline">{conf.email}</a>.
    </p>
  </div>
</section>
