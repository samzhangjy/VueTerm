import { useTerminalStore } from "@/stores/terminal";
import { checkFileStatus, FileStatus } from "@/commands/common";

const cat = (path: string) => {
  const store = useTerminalStore();
  const result = checkFileStatus(path);

  if (path.trim() === "") {
    store.endCurrentCommand("cat: missing operand");
    return;
  }

  if (result.status === FileStatus.EXIST && result.type === "file") {
    store.endCurrentCommand(result.content);
  } else if (result.status === FileStatus.EXIST && result.type === "folder") {
    store.endCurrentCommand(`cat: is a directory: ${path}`);
  } else if (result.status === FileStatus.NOT_EXIST) {
    store.endCurrentCommand(`cat: no such file or directory: ${path}`);
  } else if (result.status === FileStatus.TOO_COMPLEX) {
    store.endCurrentCommand(`cat: path too complicated: ${path}`);
  } else {
    store.endCurrentCommand(`cat: unknown error`);
  }
};

export default cat;
