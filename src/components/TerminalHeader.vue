<template>
  <div class="markdown-content" v-if="store.showHeader">
    <MarkdownContent />
  </div>
</template>

<script lang="ts" setup>
import { VueComponent as MarkdownContent } from "../config/heading.md";
import { useTerminalStore } from "@/stores/terminal";

const store = useTerminalStore();
</script>

<style lang="scss">
@import "@/styles/markdown.scss";
</style>
