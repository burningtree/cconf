<script>
  // The COREconf lockup. `size` controls the scale via tailwind text classes.
  // "CORE" is the exact glyphs from the MESHCORE logo; "conf" stays as type.
  import CoreGlyphs from './CoreGlyphs.svelte';
  let { size = 'text-3xl', class: klass = '' } = $props();
</script>

<span class="inline-flex items-end {size} text-white {klass}">
  <CoreGlyphs />
  <span
    class="ml-[0.06em] translate-y-[0.16em] font-light lowercase tracking-tight text-fog/90 leading-none"
    style="font-size:0.8em"
  >conf</span>
</span>
