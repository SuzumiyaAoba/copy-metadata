export type Template = {
  name: string;
  template: string;
};

export type Templates = Record<
  string,
  {
    template: string;
  }
>;

const BuiltInTemplates: Templates = {
  URL: {
    template: "{{{ url }}}"
  },
  Title: {
    template: "{{{ title }}}"
  },
  Markdown: {
    template: "[{{{ title }}}]({{{ url }}})"
  },
  Org: {
    template: "[[{{{ url }}}][{{{ title }}}]]"
  },
  Asciidoc: {
    template: "{{{ url }}}[{{{ title }}}]"
  }
};

export type Config = {
  version: number;
  templates: Templates;
  enabledTemplate: Template;
  copyOnIconClick: boolean;
};

export const DefaultConfig: Config = {
  version: 1,
  templates: BuiltInTemplates,
  enabledTemplate: { name: "Markdown", ...BuiltInTemplates["Markdown"] },
  copyOnIconClick: false
};
