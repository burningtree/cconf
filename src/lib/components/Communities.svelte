<script>
  import flagCH from 'country-flag-icons/string/3x2/CH';
  import flagCZ from 'country-flag-icons/string/3x2/CZ';
  import flagPT from 'country-flag-icons/string/3x2/PT';
  import SectionHeading from './SectionHeading.svelte';
  import { communityGroups, conf } from '../content.js';

  const flags = {
    CH: flagCH,
    CZ: flagCZ,
    PT: flagPT
  };

  function initials(name) {
    return name
      .replace(/[^\p{L}\s]/gu, '')
      .split(/\s+/)
      .filter(Boolean)
        .slice(0, 3)
        .map((word) => word[0].toUpperCase())
        .join('');
  }

  function flagSrc(code) {
    const svg = flags[code];
    return svg ? `data:image/svg+xml,${encodeURIComponent(svg)}` : '';
  }
</script>

<section id="communities" class="border-t border-hair/60 bg-void py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="03"
      kicker="Communities"
      title="Communities around the table."
    />

    <p class="-mt-8 mb-12 max-w-2xl text-lg leading-relaxed text-mist">
      COREconf is an invitation to the communities building open mesh. We want
      project maintainers, local operators and field crews to take part through
      talks, workshops, demos and hard-won experience from real deployments.
    </p>

    <div class="grid gap-x-16 gap-y-12 md:grid-cols-2">
      {#each communityGroups as group}
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-sky">{group.title}</h3>

          <ul class="mt-6 divide-y divide-hair/50 border-t border-hair/50">
            {#each group.items as community}
              {@const Tag = community.href ? 'a' : 'div'}
              <li>
                <svelte:element
                  this={Tag}
                  href={community.href}
                  target={community.href && !community.href.startsWith('mailto') ? '_blank' : undefined}
                  rel={community.href && !community.href.startsWith('mailto') ? 'noreferrer' : undefined}
                  class="group flex items-center gap-4 py-4"
                >
                  <div class="grid h-10 w-10 shrink-0 overflow-hidden rounded-md text-xs font-semibold text-sky">
                    {#if community.logo}
                      <img src={community.logo} alt="" loading="lazy" class="h-full w-full object-cover" />
                    {:else if community.flag}
                      <img src={flagSrc(community.flag)} alt="" loading="lazy" class="h-full w-full object-cover" />
                    {:else if community.cta}
                      <span class="place-self-center text-xl font-light text-mist">+</span>
                    {:else}
                      <span class="place-self-center rounded-md bg-sky/10 p-2">{initials(community.name)}</span>
                    {/if}
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-base font-semibold text-white group-hover:text-sky">{community.name}</h4>
                    <p class="text-sm text-mist">{community.type}</p>
                  </div>

                  {#if community.href}
                    <span class="text-mist transition group-hover:text-sky" aria-hidden="true">↗</span>
                  {/if}
                </svelte:element>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <p class="mt-12 text-mist">
      Missing a community?
      <a href="mailto:{conf.email}" class="text-sky underline-offset-4 hover:underline">{conf.email}</a>
    </p>
  </div>
</section>
