import { useTerminalStore } from "@/stores/terminal";
import config from "@/config";

const pwd = () => {
  const store = useTerminalStore();
  store.endCurrentCommand(
    `/home/${config.terminal.visitorUsername}${store.pwd.slice(1)}`
  );
};

export default pwd;
