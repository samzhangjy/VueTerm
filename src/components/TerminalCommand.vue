<template>
  <div class="command-container">
    <div class="command-prefix">
      <span class="user-info">
        {{ config.terminal.visitorUsername }}@{{ config.info.domain }}
      </span>
      <span class="user-sep">{{ ":" }}</span>
      <span class="user-path">
        {{ $props.pwd }}
      </span>
    </div>
    <div class="command-slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import config from "@/config";

defineProps<{
  pwd: string;
}>();
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.command-container {
  width: 100%;
  display: inline;
}

.command-prefix {
  display: inline;

  & .user-info {
    display: inline;
    font-weight: bold;
    color: $green;
  }

  & .user-sep {
    margin: 0px;
  }

  & .user-path {
    color: $purple;
    font-weight: bold;
  }
}

.command-slot {
  display: inline;

  &::before {
    content: "$";
    color: $foreground;
    display: inline;
    margin: 0px 10px 0px 2px;
  }

  :deep(& *) {
    display: inline;
  }
}
</style>
