import filesystem from "@/config/filesystem";
import { useTerminalStore, type File } from "@/stores/terminal";

const getFileColor = (fileType: string) => {
  if (fileType === "folder") return "purple";
  if (fileType === "file") return "white";
  return "red";
};

const getFileWeight = (fileType: string) => {
  if (fileType === "folder") return "700";
  if (fileType === "file") return "400";
  return "400";
};

const ls = (flags: string) => {
  const store = useTerminalStore();
  const currentFiles: File[] = [];
  if (flags && flags.includes("-a")) {
    currentFiles.push({
      text: ".",
      color: getFileColor("folder"),
      weight: getFileWeight("folder"),
    });
    currentFiles.push({
      text: "..",
      color: getFileColor("folder"),
      weight: getFileWeight("folder"),
    });
  }
  const pwd = store.pwd + "/";

  for (let i = 0; i < filesystem.files.length; i++) {
    const file = filesystem.files[i];
    const normalPath = file.path.slice(
      0,
      file.path[file.path.length - 1] === "/" ? -1 : undefined
    );
    const normalPathSlashes = normalPath.match(/\//g)?.length || 0,
      pwdPathSlashes = pwd.match(/\//g)?.length || 0;
    if (
      // folder
      file.type === "folder" &&
      normalPath !== pwd &&
      normalPathSlashes === pwdPathSlashes &&
      normalPath.startsWith(pwd)
    ) {
      currentFiles.push({
        text: file.name,
        color: getFileColor(file.type),
        weight: getFileWeight(file.type),
      });
    } else if (
      // text files
      file.type !== "folder" &&
      pwd.slice(0, -1) === normalPath &&
      pwdPathSlashes - normalPathSlashes === 1
    ) {
      currentFiles.push({
        text: file.name,
        color: getFileColor(file.type),
        weight: getFileWeight(file.type),
      });
    }
  }
  store.endCurrentCommand(currentFiles);
};

export default ls;
