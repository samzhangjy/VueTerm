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
}

export const useTerminalStore = defineStore({
  id: "terminal",
  state: () => ({
    currentCommand: "" as string,
    history: [] as History[],
    pwd: "~" as string,
  }),
  actions: {
    endCurrentCommand(output?: string | File[]) {
      if (output === undefined) {
        this.currentCommand = "";
        return;
      }
      this.history.push({
        command: this.currentCommand,
        output: output,
        pwd: this.pwd,
      });
      this.currentCommand = "";
    },
    clearHistory() {
      this.history = [];
      this.currentCommand = "";
    },
  },
});
