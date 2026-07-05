<script>
  import Wordmark from './Wordmark.svelte';
  import { nav, conf } from '../content.js';
</script>

<footer class="border-t border-hair/60 bg-ink">
  <div class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
    <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      <div class="max-w-sm">
        <div class="flex items-center gap-3">
          <Wordmark size="text-2xl" />
        </div>
        <p class="mt-4 text-mist">
          An open, non-profit conference on mesh technologies, resilient
          communication and the people who build it.
        </p>
        <p class="mt-4 text-mist">
          {conf.datesPlace}
        </p>
      </div>

      <nav class="flex flex-col gap-3">
        <span class="text-xs uppercase tracking-[0.2em] text-mist/70">Explore</span>
        {#each nav as item}
          <a href={item.href} class="text-fog transition-colors hover:text-sky">{item.label}</a>
        {/each}
      </nav>

      <div class="flex flex-col gap-3">
        <span class="text-xs uppercase tracking-[0.2em] text-mist/70">Connect</span>
        <a href="mailto:{conf.email}" class="text-fog transition-colors hover:text-sky">{conf.email}</a>
        <a href={conf.repoUrl} class="text-fog transition-colors hover:text-sky">GitHub</a>
        <a href={conf.ticketUrl} class="text-fog transition-colors hover:text-sky">Tickets</a>
      </div>
    </div>

    <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hair/60 pt-8 text-sm text-mist sm:flex-row">
      <p>© {conf.year} COREconf. Open source under MIT.</p>
      <p class="flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-sky"></span>
        </span>
        Built by the community, for the mesh.
      </p>
    </div>
  </div>
</footer>
