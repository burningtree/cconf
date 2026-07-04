<script>
  import SectionHeading from './SectionHeading.svelte';
  import { program } from '../content.js';

  const trackColor = {
    Opening: 'text-sky border-sky/40',
    Talk: 'text-fog border-hair',
    Workshop: 'text-sky-bright border-sky/40',
    'Field op': 'text-emerald-300 border-emerald-400/30',
    Social: 'text-amber-200 border-amber-300/30'
  };
</script>

<section id="program" class="border-t border-hair/60 bg-void py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-10">
    <SectionHeading
      index="02"
      kicker="Program"
      title="One day. Talks, solder fumes and hands-on mesh."
    />
    <p class="-mt-8 mb-12 max-w-xl text-mist">
      Draft schedule for edition #0. Times and titles will shift as the CFP closes.
    </p>

    <ul class="divide-y divide-hair/60 overflow-hidden rounded-2xl border border-hair/70 bg-ink">
      {#each program as slot}
        <li class="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 p-5 transition-colors hover:bg-panel/60 sm:grid-cols-[5rem_8rem_1fr_auto] sm:items-center sm:p-6">
          <span class="font-mono text-lg tabular-nums text-white">{slot.time}</span>
          <span
            class="justify-self-start rounded-md border px-2.5 py-1 text-xs font-medium uppercase tracking-wide {trackColor[slot.track] ?? 'text-fog border-hair'}"
          >
            {slot.track}
          </span>
          <span class="col-span-2 text-lg text-fog sm:col-span-1 sm:text-white">{slot.title}</span>
          <span class="col-span-2 text-sm text-mist sm:col-span-1 sm:justify-self-end">{slot.speaker}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
