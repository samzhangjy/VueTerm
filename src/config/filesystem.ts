import { html as about } from "@/config/about.md";
import { html as welcome } from "@/config/welcome.md";

export default {
  files: [
    {
      type: "folder",
      path: "~/projects/",
      name: "projects",
    },
    {
      type: "file",
      content: welcome,
      path: "~/projects",
      name: "welcome.md",
    },
    {
      type: "file",
      content: about,
      path: "~/",
      name: "about-me.md",
    },
    {
      type: "folder",
      path: "~/projects/new/",
      name: "new",
    },
  ],
};
