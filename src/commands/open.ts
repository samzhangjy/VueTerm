import { useTerminalStore } from "@/stores/terminal";
import cat from "./cat";
import cd from "./cd";
import exec from "./exec";
import { checkFileStatus, FileStatus } from "./common";

const open = (path: string) => {
  const store = useTerminalStore();
  const result = checkFileStatus(path);

  if (result.status !== FileStatus.EXIST) {
    store.endCurrentCommand(`open: no such file or directory: ${path}`);
    return;
  }

  if (result.type === "folder") {
    cd(path);
  } else if (result.type === "file") {
    cat(path);
  } else if (result.type === "link") {
    exec(path);
  }
};

export default open;
