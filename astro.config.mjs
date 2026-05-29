// @ts-check
import { defineConfig } from 'astro/config';

// Fully static site — deploys as plain files to Cloudflare Pages.
export default defineConfig({
  site: 'https://wigipedia.io',
  output: 'static',
});
