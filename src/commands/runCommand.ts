import ls from "./ls";
import cd from "./cd";
import cat from "./cat";
import pwd from "./pwd";
import help from "./help";
import open from "./open";
import { checkFileStatus, FileStatus } from "./common";
import { useTerminalStore } from "@/stores/terminal";
import clear from "./clear";
import exec from "./exec";

export enum CommandMap {
  ls = "ls",
  l = "l",
  cd = "cd",
  clear = "clear",
  cat = "cat",
  help = "help",
  pwd = "pwd",
  open = "open",
}

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
    return;
  }

  if (checkFileStatus(store.currentCommand).status === FileStatus.EXIST) {
    exec(store.currentCommand);
    return;
  }

  const command = commandCalled[1];
  const arg = commandCalled[2];

  const map: Record<CommandMap, (args: string) => void> = {
    l: ls,
    ls: ls,
    cd: cd,
    clear: clear,
    cat: cat,
    help: help,
    pwd: pwd,
    open: open,
  };

  Reflect.has(map, command)
    ? map[command as CommandMap](arg)
    : store.endCurrentCommand(`bash: command not found: ${commandCalled[1]}`);
};

export default runCommand;
