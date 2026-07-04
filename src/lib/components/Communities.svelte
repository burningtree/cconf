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

    <div class="-mt-8 mb-12 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
      <p class="max-w-2xl text-lg leading-relaxed text-mist">
        COREconf is focused on the open mesh projects, protocols, tools and
        local crews shaping this space. Some are confirmed in the room, some are
        areas we want to connect with as the programme grows.
      </p>
      <p class="max-w-xl text-sm leading-relaxed text-fog lg:justify-self-end">
        Living snapshot, not an official partner wall. Missing a project, local
        mesh or field crew? Tell us.
      </p>
    </div>

    <div class="grid gap-8 xl:grid-cols-2">
      {#each communityGroups as group}
        <section class="overflow-hidden rounded-2xl border border-hair/70 bg-ink">
          <div class="border-b border-hair/70 p-6 sm:p-7">
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="text-2xl font-semibold text-white">{group.title}</h3>
              <span class="text-sm text-sky">{group.items.length}</span>
            </div>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{group.description}</p>
          </div>

          <ul class="divide-y divide-hair/70">
            {#each group.items as community}
              {@const Tag = community.href ? 'a' : 'div'}
              <li>
                <svelte:element
                  this={Tag}
                  href={community.href}
                  target={community.href ? '_blank' : undefined}
                  rel={community.href ? 'noreferrer' : undefined}
                  class="group grid gap-4 p-5 transition-colors hover:bg-panel/60 sm:grid-cols-[3.5rem_1fr_auto] sm:p-6"
                >
                  <div
                    class="grid h-12 w-12 overflow-hidden rounded-lg border text-sm font-semibold text-sky
                      {community.logo || community.flag ? 'border-hair/70 bg-panel' : 'border-sky/30 bg-sky/10'}"
                  >
                    {#if community.logo}
                      <img
                        src={community.logo}
                        alt=""
                        loading="lazy"
                        class="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                      />
                    {:else if community.flag}
                      <img
                        src={flagSrc(community.flag)}
                        alt=""
                        loading="lazy"
                        class="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                      />
                    {:else}
                      <span class="place-self-center">{initials(community.name)}</span>
                    {/if}
                  </div>

                  <div>
                    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 class="text-lg font-semibold text-white group-hover:text-sky">
                        {community.name}
                      </h4>
                      <span class="text-xs uppercase tracking-[0.18em] text-sky/75">{community.type}</span>
                    </div>
                    <p class="mt-2 text-sm leading-relaxed text-mist">{community.description}</p>
                  </div>

                  {#if community.href}
                    <span
                      class="grid h-9 w-9 place-items-center rounded-lg border border-hair text-sky transition-all group-hover:border-sky/40 group-hover:bg-sky/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  {/if}
                </svelte:element>
              </li>
            {/each}
          </ul>
        </section>
      {/each}
    </div>

    <p class="mt-10 text-mist">
      Missing a community?
      <a href="mailto:{conf.email}" class="text-sky underline-offset-4 hover:underline">{conf.email}</a>
    </p>
  </div>
</section>
