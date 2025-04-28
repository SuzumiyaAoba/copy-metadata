export type Template = {
  template: string;
};

export type Templates = Record<string, Template>;

export const BuiltInTemplates: Templates = {
  URL: {
    template: "{{{ url }}}",
  },
  Title: {
    template: "{{{ title }}}",
  },
  Markdown: {
    template: "[{{{ title }}}]({{{ url }}})",
  },
  Org: {
    template: "[[{{{ url }}}][{{{ title }}}]]",
  },
  Asciidoc: {
    template: "{{{ url }}}[{{{ title }}}]",
  },
};
