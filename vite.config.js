import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  // Serve files in /static at the site root (SvelteKit-style convention).
  publicDir: 'static',
  plugins: [yaml(), svelte(), tailwindcss()]
});
