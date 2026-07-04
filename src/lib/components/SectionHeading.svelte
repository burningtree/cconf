<script>
  let { index, kicker, title, class: klass = '' } = $props();
</script>

<div class="mb-14 {klass}">
  <div class="flex items-center gap-3 text-sm">
    <span class="font-semibold text-sky">{index}</span>
    <span class="h-px w-10 bg-hair"></span>
    <span class="uppercase tracking-[0.2em] text-mist">{kicker}</span>
  </div>
  <h2 class="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
    {title}
  </h2>
</div>
