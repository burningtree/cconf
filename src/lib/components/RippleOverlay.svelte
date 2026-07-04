<script>
  /**
   * Lightweight radio-ripple overlay for hover states (speaker cards, etc.).
   * Concentric sky rings emanate from the pointer while hovering — the same
   * "signal" motif as the hero, but pure CSS so it's cheap to run on many cards.
   * Drop inside a `relative` container; it fills it and clips to the bounds.
   */
  let x = $state(50);
  let y = $state(50);
  let hovering = $state(false);

  function move(e) {
    const r = e.currentTarget.getBoundingClientRect();
    x = ((e.clientX - r.left) / r.width) * 100;
    y = ((e.clientY - r.top) / r.height) * 100;
  }
</script>

<div
  class="absolute inset-0 overflow-hidden"
  class:paused={!hovering}
  onpointermove={move}
  onpointerenter={() => (hovering = true)}
  onpointerleave={() => (hovering = false)}
  aria-hidden="true"
>
  <div
    class="absolute transition-opacity duration-300 {hovering ? 'opacity-100' : 'opacity-0'}"
    style="left:{x}%; top:{y}%"
  >
    <span class="ring"></span>
    <span class="ring" style="animation-delay:-0.6s"></span>
    <span class="ring" style="animation-delay:-1.2s"></span>
  </div>
</div>

<style>
  .ring {
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 260px;
    margin: -130px;
    border: 1px solid var(--color-sky);
    border-radius: 9999px;
    opacity: 0;
    animation: card-ripple 1.8s ease-out infinite;
  }
  @keyframes card-ripple {
    0% {
      transform: scale(0.12);
      opacity: 0.45;
    }
    100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }
  .paused .ring {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .ring {
      animation: none;
    }
  }
</style>
