<template>
  <div>
    <div class="history-item" v-for="(item, index) in store.history" :key="index">
      <TerminalCommand :pwd="item.pwd">{{ item.command }}</TerminalCommand>
      <p
        class="history-output markdown-content"
        v-if="typeof item.output === 'string'"
        v-html="item.output"
      ></p>
      <div class="history-output-grid" v-else>
        <div
          class="history-output-grid-item"
          v-for="(output, index) in item.output"
          :key="index"
        >
          <p :class="`text-color-${output.color} text-weight-${output.weight}`">
            {{ output.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTerminalStore } from "@/stores/terminal";
import TerminalCommand from "./TerminalCommand.vue";

const store = useTerminalStore();
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.history-item {
  background-color: $background;
  color: $foreground;
  width: 100%;
  display: block;
}

.history-output {
  margin: 0px;
}

.history-output-grid {
  display: grid;
  grid-column: span 3;
  grid-template-columns: repeat(9, minmax(0, 1fr));

  & .history-output-grid-item {
    display: inline;
    margin: 0px;

    & p {
      display: inline;
      margin: 0px;
    }

    & .text-color-green {
      color: $green;
    }

    & .text-color-purple {
      color: $purple;
    }

    & .text-color-blue {
      color: $blue;
    }

    & .text-color-white {
      color: $white;
    }

    & .text-weight-700 {
      font-weight: 700;
    }

    & .text-weight-400 {
      font-weight: 400;
    }
  }
}

@media screen and (max-width: $break-md) {
  .history-output-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media screen and (max-width: $break-sm) {
  .history-output-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
