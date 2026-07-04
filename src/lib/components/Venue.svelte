<script>
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="venue" class="border-t border-hair/60 bg-void py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading index="04" kicker="Venue" title="Prague — high ground for a citywide mesh." />

    <div class="grid gap-8 lg:grid-cols-2 lg:items-stretch">
      <div class="flex flex-col justify-center">
        <p class="text-xl leading-relaxed text-fog">
          A hundred spires, a river valley and rooftops made for line-of-sight.
          Prague is where we point the antennas and see how far an open mesh
          can reach across a real European city.
        </p>
        <dl class="mt-8 space-y-4">
          <div class="flex items-start gap-4">
            <span class="mt-1 text-sky">◈</span>
            <div>
              <dt class="font-semibold text-white">Central & reachable</dt>
              <dd class="text-mist">Walkable from the old town, wired for a weekend of hacking.</dd>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="mt-1 text-sky">◈</span>
            <div>
              <dt class="font-semibold text-white">Rooftop range tests</dt>
              <dd class="text-mist">We take nodes to elevation and map the coverage live.</dd>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="mt-1 text-sky">◈</span>
            <div>
              <dt class="font-semibold text-white">Exact address on ticket</dt>
              <dd class="text-mist">Venue announced to attendees closer to the date.</dd>
            </div>
          </div>
        </dl>
      </div>

      <div class="relative min-h-72 overflow-hidden rounded-2xl border border-hair/70 bg-ink">
        <img src="/hero.svg" alt="Stylised Prague skyline with a signal tower" class="h-full w-full object-cover opacity-70" />
        <div class="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"></div>
        <div class="absolute bottom-5 left-5 flex items-center gap-2 text-sm text-fog">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky"></span>
          </span>
          50.08° N · 14.42° E
        </div>
      </div>
    </div>
  </div>
</section>
