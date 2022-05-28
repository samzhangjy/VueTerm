import commands from "@/config/commands";
import { useTerminalStore } from "@/stores/terminal";

const help = () => {
  const store = useTerminalStore();
  let helpString = "<ul>";
  commands.commands.forEach((command) => {
    helpString += `<li>${command.name}: ${command.description}</li>`;
  });
  helpString += "</ul>";
  store.endCurrentCommand(helpString);
};

export default help;
