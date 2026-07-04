<script>
  /** A compact styled bits-ui single-select used by the LoRa controls. */
  import { Select } from 'bits-ui';

  let { value = $bindable(), items, label, min = '3.5rem' } = $props();

  const current = $derived(items.find((i) => i.value === value)?.label ?? value);
</script>

<label class="flex flex-col gap-1">
  <span class="text-[10px] uppercase tracking-wider text-mist/60">{label}</span>
  <Select.Root type="single" bind:value>
    <Select.Trigger
      style="min-width:{min}"
      class="flex items-center justify-between gap-2 rounded-md border border-hair bg-ink px-2 py-1
        text-fog outline-none transition-colors hover:border-sky/60 focus:border-sky
        data-[state=open]:border-sky"
    >
      <span>{current}</span>
      <span class="text-mist/50">▾</span>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content
        sideOffset={6}
        class="z-50 max-h-64 overflow-y-auto rounded-md border border-hair bg-ink/95 p-1
          font-mono text-xs shadow-xl shadow-black/40 backdrop-blur-md"
      >
        <Select.Viewport>
          {#each items as item}
            <Select.Item
              value={item.value}
              label={item.label}
              class="flex cursor-pointer items-center justify-between gap-4 rounded px-2 py-1 text-mist
                outline-none data-[highlighted]:bg-sky/15 data-[highlighted]:text-fog
                data-[selected]:text-sky"
            >
              {#snippet children({ selected })}
                <span>{item.label}</span>
                {#if selected}<span class="text-sky">●</span>{/if}
              {/snippet}
            </Select.Item>
          {/each}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</label>
