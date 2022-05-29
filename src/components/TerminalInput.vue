<template>
  <TerminalCommand :pwd="store.pwd">
    <input
      class="input"
      v-model="store.currentCommand"
      @keyup.enter="onEnter"
      @keydown.up="onUp"
      @keydown.down="onDown"
      autofocus
    />
  </TerminalCommand>
</template>

<script setup lang="ts">
import { useTerminalStore } from "@/stores/terminal";
import TerminalCommand from "./TerminalCommand.vue";
import runCommand from "@/commands/runCommand";
import { ref } from "vue";

const store = useTerminalStore();
const currentCommandHistory = ref(-1);
const currentTypedCommand = ref("");

const onEnter = () => {
  runCommand();
  currentCommandHistory.value = -1;
  currentTypedCommand.value = "";
  setTimeout(
    () =>
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      ),
    50
  );
};

const onUp = (event: KeyboardEvent) => {
  event.preventDefault();
  if (currentCommandHistory.value === -1) {
    currentCommandHistory.value = store.history.length - 1;
    currentTypedCommand.value = store.currentCommand;
  } else if (currentCommandHistory.value > 0) {
    currentCommandHistory.value--;
  }
  store.currentCommand = store.history[currentCommandHistory.value].command;
};

const onDown = (event: KeyboardEvent) => {
  event.preventDefault();
  if (currentCommandHistory.value === -1) {
    return;
  }
  if (currentCommandHistory.value < store.history.length - 1) {
    currentCommandHistory.value++;
    store.currentCommand = store.history[currentCommandHistory.value].command;
  } else {
    currentCommandHistory.value = -1;
    store.currentCommand = currentTypedCommand.value;
  }
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

@media screen and (max-width: $break-md) {
  .input {
    width: 300px;
  }
}

@media screen and (max-width: $break-sm) {
  .input {
    width: 80px;
  }
}
</style>
