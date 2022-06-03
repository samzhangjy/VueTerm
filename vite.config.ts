import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import markdown, { Mode } from "vite-plugin-markdown";
import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import highlightjs from "markdown-it-highlightjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    markdown({
      mode: [Mode.VUE, Mode.HTML],
      markdownIt: MarkdownIt({
        linkify: true,
        html: true,
        typographer: true,
        breaks: true,
      })
        .use(mila, { attrs: { target: "_blank", rel: "noopener" } })
        .use(highlightjs),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
