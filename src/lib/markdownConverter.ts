import MarkdownIt from "markdown-it/lib";

export const markdown2Html = (markdown: string): string => {
  const md = new MarkdownIt();
  return md.render(markdown);
};
