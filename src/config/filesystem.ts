import { html as about } from "@/config/about.md";
import { html as logture } from "@/config/projects/logture.md";
import { html as vueterm } from "@/config/projects/vueterm.md";
import { html as vueblogger } from "@/config/projects/vueblogger.md";
import { html as go_blog } from "@/config/projects/go-blog.md";
import { html as baiduspider } from "@/config/projects/baiduspider.md";

export default {
  files: [
    {
      type: "folder",
      path: "~/projects/",
      name: "projects",
    },
    {
      type: "file",
      content: about,
      path: "~/",
      name: "welcome.md",
    },
    {
      type: "file",
      content: logture,
      path: "~/projects",
      name: "logture.md",
    },
    {
      type: "file",
      content: vueterm,
      path: "~/projects",
      name: "vueterm.md",
    },
    {
      type: "file",
      content: vueblogger,
      path: "~/projects",
      name: "vueblogger.md",
    },
    {
      type: "file",
      content: go_blog,
      path: "~/projects",
      name: "go-blog.md",
    },
    {
      type: "file",
      content: baiduspider,
      path: "~/projects",
      name: "baiduspider.md",
    },
  ],
};
