import { defineStore } from "pinia";

export interface File {
  text: string;
  color: string;
  weight: string;
}

export interface History {
  command: string;
  output: string | File[];
  pwd: string;
  show?: boolean;
  isEmpty?: boolean;
}

export const useTerminalStore = defineStore({
  id: "terminal",
  state: () => ({
    currentCommand: "" as string,
    history: [] as History[],
    pwd: "~" as string,
    showHeader: true,
  }),
  actions: {
    endCurrentCommand(output?: string | File[]) {
      if (output === undefined) {
        this.currentCommand = "";
        return;
      }
      let isEmpty = false;
      if (typeof output === "string" && output.trim() === "") isEmpty = true;
      this.history.push({
        command: this.currentCommand,
        output: output,
        pwd: this.pwd,
        show: true,
        isEmpty,
      });
      this.currentCommand = "";
    },
    clearHistory() {
      this.history.map((history) => (history.show = false));
      this.history.push({
        command: this.currentCommand,
        output: "",
        pwd: this.pwd,
        show: false,
        isEmpty: false,
      });
      this.showHeader = false;
    },
  },
  getters: {
    historyShown(): History[] {
      return this.history.filter((history) => history.show);
    },
    validHistory(): History[] {
      return this.history.filter((history) => !history.isEmpty);
    },
  },
});
