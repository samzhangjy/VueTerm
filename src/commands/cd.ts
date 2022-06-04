import { useTerminalStore } from "@/stores/terminal";
import { checkFileStatus, FileStatus } from "@/commands/common";

const cd = (path: string) => {
  const store = useTerminalStore();
  const result = checkFileStatus(path);
  if (result.status === FileStatus.EXIST && result.type === "folder") {
    store.endCurrentCommand("");
    store.pwd = result.path;
  } else if (result.status === FileStatus.EXIST) {
    store.endCurrentCommand(`cd: not a directory: ${path}`);
  } else if (result.status === FileStatus.NOT_EXIST) {
    store.endCurrentCommand(`cd: no such file or directory: ${path}`);
  } else if (result.status === FileStatus.TOO_COMPLEX) {
    store.endCurrentCommand(`cd: path too complicated: ${path}`);
  } else {
    store.endCurrentCommand(`cd: unknown error`);
  }
};

export default cd;
