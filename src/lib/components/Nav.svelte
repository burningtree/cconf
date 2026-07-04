<script>
  import Wordmark from './Wordmark.svelte';
  import { nav, conf } from '../content.js';

  let scrolled = $state(false);
  let pastHero = $state(false);
  let open = $state(false);

  function onScroll() {
    scrolled = window.scrollY > 24;
  }

  // The lockup only appears once the hero has fully scrolled out of view.
  $effect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => (pastHero = !entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  });
</script>

<svelte:window on:scroll={onScroll} />

<header
  class="fixed inset-x-0 top-0 z-50 transition-all duration-300
    {scrolled ? 'border-b border-hair/70 bg-void/80 backdrop-blur-xl' : 'border-b border-transparent'}"
>
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
    <!-- Empty over the hero; the COREconf #0 / 2026 lockup fades in once past it. -->
    <a
      href="#top"
      class="flex items-center gap-3 transition-all duration-300 {pastHero
        ? 'pointer-events-auto translate-y-0 opacity-100'
        : 'pointer-events-none -translate-y-1 opacity-0'}"
      aria-label="COREconf #0 / 2026 — home"
      aria-hidden={!pastHero}
      tabindex={pastHero ? 0 : -1}
    >
      <Wordmark size="text-xl" />
      <span class="hidden items-center gap-1.5 text-sm sm:flex">
        <span class="font-semibold text-sky">{conf.edition}</span>
        <span class="text-mist">/ {conf.year}</span>
      </span>
    </a>

    <ul class="hidden items-center gap-8 md:flex">
      {#each nav as item}
        <li>
          <a
            href={item.href}
            class="text-sm font-medium text-mist transition-colors hover:text-white"
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="flex items-center gap-3">
      <a
        href={conf.ticketUrl}
        class="group hidden items-center gap-2 rounded-lg border border-sky/40 px-5 py-2.5
          text-sm font-semibold text-white transition-all hover:border-sky hover:bg-sky/10 sm:inline-flex"
      >
        Get Tickets
        <span class="text-sky transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>

      <button
        class="grid h-10 w-10 place-items-center rounded-lg border border-hair text-fog md:hidden"
        onclick={() => (open = !open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span class="text-lg">{open ? '✕' : '☰'}</span>
      </button>
    </div>
  </nav>

  {#if open}
    <div class="border-t border-hair bg-void/95 px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-1">
        {#each nav as item}
          <li>
            <a
              href={item.href}
              onclick={() => (open = false)}
              class="block rounded-md px-2 py-2.5 text-base text-fog hover:bg-panel hover:text-white"
            >
              {item.label}
            </a>
          </li>
        {/each}
        <li class="pt-2">
          <a
            href={conf.ticketUrl}
            onclick={() => (open = false)}
            class="block rounded-lg border border-sky/40 px-4 py-3 text-center font-semibold text-white"
          >
            Get Tickets ↗
          </a>
        </li>
      </ul>
    </div>
  {/if}
</header>
