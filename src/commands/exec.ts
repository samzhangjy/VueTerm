import { useTerminalStore } from "@/stores/terminal";
import { checkFileStatus, FileStatus } from "./common";

const exec = (path: string) => {
  const store = useTerminalStore();
  const result = checkFileStatus(path);

  if (result.status !== FileStatus.EXIST) {
    store.endCurrentCommand(`exec: no such file or directory: ${path}`);
    return;
  }
  if (result.type !== "link") {
    store.endCurrentCommand(`exec: not executable: ${path}`);
    return;
  }

  store.endCurrentCommand("");
  window.open(result.content);
};

export default exec;
