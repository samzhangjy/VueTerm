import ls from "./ls";
import cd from "./cd";
import cat from "./cat";
import pwd from "./pwd";
import help from "./help";
import { useTerminalStore } from "@/stores/terminal";

const runCommand = () => {
  const store = useTerminalStore();
  if (store.currentCommand.trim() === "") {
    store.endCurrentCommand("");
    return;
  }
  const commandCalled = /^(\w+)\s?(.*)$/.exec(store.currentCommand) || [];
  commandCalled.map((value) => {
    return value.trim();
  });

  if (store.currentCommand.startsWith("#")) {
    store.endCurrentCommand("");
  } else if (commandCalled[1] === "ls" || commandCalled[1] === "l") {
    ls(commandCalled[2]);
  } else if (commandCalled[1] === "cd") {
    cd(commandCalled[2]);
  } else if (commandCalled[1] === "clear") {
    store.clearHistory();
  } else if (commandCalled[1] === "cat") {
    cat(commandCalled[2]);
  } else if (commandCalled[1] === "help") {
    help();
  } else if (commandCalled[1] === "pwd") {
    pwd();
  } else {
    store.endCurrentCommand(`bash: command not found: ${commandCalled[1]}`);
  }
};

export default runCommand;
