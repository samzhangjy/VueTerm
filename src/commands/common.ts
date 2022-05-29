import { useTerminalStore } from "@/stores/terminal";
import filesystem from "@/config/filesystem";

export enum FileStatus {
  EXIST = "exist",
  NOT_EXIST = "not exist",
  TOO_COMPLEX = "path too complicated",
}

export interface FileStatusValue {
  type?: "folder" | "file";
  path: string;
  status: FileStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}

export const getAbsolutePath = (path: string): string | FileStatus => {
  const store = useTerminalStore();
  if (path === "." || path === "./") {
    return store.pwd;
  }
  if (path === ".." || path === "../") {
    if (store.pwd === "~") return "~";
    return store.pwd.slice(0, store.pwd.lastIndexOf("/"));
  }
  if (path.startsWith("../")) {
    return FileStatus.TOO_COMPLEX;
  }
  if (path === "~" || path === "/" || path === "~/" || path.trim() === "") {
    return "~";
  }
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (path.startsWith("/")) {
    return "~/" + path.slice(1);
  }
  if (path.startsWith("./")) {
    return `${store.pwd}/${path.slice(2)}`;
  }
  return `${store.pwd}/${path}`;
};

export const checkFileStatus = async (
  path: string
): Promise<FileStatusValue> => {
  const newPath = getAbsolutePath(path);
  console.log(newPath);
  if (
    (path.match(/\./g)?.length || 0) >= 4 ||
    newPath === FileStatus.TOO_COMPLEX
  ) {
    return {
      status: FileStatus.TOO_COMPLEX,
      path: "",
    };
  }
  if (newPath === "~") {
    return {
      status: FileStatus.EXIST,
      type: "folder",
      path: "~",
    };
  }
  for (let i = 0; i < filesystem.files.length; i++) {
    const file = filesystem.files[i];
    const normalPath = file.path.slice(
      0,
      file.path[file.path.length - 1] === "/" ? -1 : undefined
    );
    if (normalPath === newPath && file.type === "folder") {
      return {
        status: FileStatus.EXIST,
        type: "folder",
        path: newPath,
      };
    } else if (
      file.type !== "folder" &&
      `${normalPath}/${file.name}` === newPath
    ) {
      return {
        status: FileStatus.EXIST,
        type: "file",
        path: `${normalPath}/${file.name}`,
        content: file.content,
      };
    }
  }
  return {
    status: FileStatus.NOT_EXIST,
    path: "",
  };
};
