import { z } from "zod";

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

const configSchema = z.object({
  version: z.literal(1),
  templates: z.record(z.object({ template: z.string() })),
  enabledTemplate: z.object({ name: z.string(), template: z.string() }),
  copyOnIconClick: z.boolean(),
});

export const parseConfig = (json: unknown) => {
  return configSchema.parse(json);
};

export type Config = z.infer<typeof configSchema>;

export const DefaultConfig: Config = {
  version: 1,
  templates: BuiltInTemplates,
  enabledTemplate: { name: "Markdown", ...BuiltInTemplates["Markdown"] },
  copyOnIconClick: false,
};
