import { getBucket } from "@extend-chrome/storage";
import { z } from "zod";

const templateSchema = z.object({
  template: z.string(),
});

export type Template = z.infer<typeof templateSchema>;

const templatesSchema = z.record(templateSchema);

export type Templates = z.infer<typeof templatesSchema>;

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

const configSchema = z.object({
  version: z.literal(1),
  templates: z.record(z.object({ template: z.string() })),
  enabledTemplate: z.object({ name: z.string(), template: z.string() }),
  copyOnIconClick: z.boolean(),
  theme: z.enum(["purple", "blue", "emerald"]).default("purple"),
  copyDuration: z.number().default(2000),
});

export const parseConfig = async (json: unknown) => {
  try {
    return configSchema.parse(json);
  } catch (_e) {
    await setConfig(DefaultConfig);

    return DefaultConfig;
  }
};

export type Config = z.infer<typeof configSchema>;

export const DefaultConfig: Config = {
  version: 1,
  templates: BuiltInTemplates,
  enabledTemplate: { name: "Markdown", ...BuiltInTemplates["Markdown"] },
  copyOnIconClick: false,
  theme: "purple",
  copyDuration: 5000,
};

export const CONFIG_KEY = "config";
export const configBucket = getBucket(CONFIG_KEY);

export async function getConfig() {
  const config = await configBucket.get();

  return await parseConfig(config);
}

export async function setConfig(config: Config) {
  await configBucket.set(config);
}

export function subscribeTemplates(callback: (_templates: Templates) => void) {
  configBucket.changeStream.subscribe(({ templates }) => {
    if (templates) {
      callback(templatesSchema.parse(templates.newValue));
    }
  });
}
