<template>
  <div class="terminal">
    <TerminalHeader />
    <TerminalHistory />
    <TerminalInput />
  </div>
</template>

<script lang="ts" setup>
import TerminalInput from "./TerminalInput.vue";
import TerminalHistory from "./TerminalHistory.vue";
import TerminalHeader from "./TerminalHeader.vue";
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.terminal {
  background-color: $background;
  color: $foreground;
  margin: 0px;
  padding: 20px;
}
</style>
