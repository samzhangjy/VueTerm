<template>
  <TerminalCommand :pwd="store.pwd">
    <input
      class="input"
      v-model="store.currentCommand"
      @keyup.enter="onEnter"
      autofocus
    />
  </TerminalCommand>
</template>

<script setup lang="ts">
import { useTerminalStore } from "@/stores/terminal";
import TerminalCommand from "./TerminalCommand.vue";
import runCommand from "@/commands/runCommand";

const store = useTerminalStore();

const onEnter = () => {
  runCommand();
  setTimeout(
    () =>
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      ),
    50
  );
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.input {
  background-color: $background;
  color: $foreground;
  border: none;
  width: 500px;
  resize: block;
  height: 100%;
  margin: 0px;
  padding: 0px;

  &:focus {
    outline: none;
  }
}
</style>
