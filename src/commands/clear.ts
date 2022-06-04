import { useTerminalStore } from "@/stores/terminal";

const clear = () => {
  const store = useTerminalStore();
  store.clearHistory();
  store.currentCommand = "";
};

export default clear;
