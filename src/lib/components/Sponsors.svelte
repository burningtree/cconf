<script>
  import SectionHeading from './SectionHeading.svelte';
  import { conf } from '../content.js';
</script>

<section id="sponsors" class="border-t border-hair/60 bg-void py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="03"
      kicker="Sponsors"
      title="Back an open, non-profit conference."
    />

    <p class="-mt-8 max-w-xl text-lg leading-relaxed text-mist">
      COREconf is community-run and not-for-profit. We’re looking for companies
      and projects in mesh, radio and open hardware who want to keep tickets
      affordable and the workshops free. In return you get a genuinely technical
      audience of builders and operators.
    </p>

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
