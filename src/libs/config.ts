import { getBucket } from "@extend-chrome/storage";
import { z } from "zod";
import { BuiltInTemplates, Template, Templates } from "@/constants/templates";
import type { AppConfig } from "@/types";

const templateSchema = z.object({
  template: z.string(),
});

export type { Template, Templates };

const templatesSchema = z.record(templateSchema);

export const configSchema = z.object({
  version: z.literal(1),
  templates: z.record(z.object({ template: z.string() })),
  enabledTemplate: z.object({ name: z.string(), template: z.string() }),
  copyOnIconClick: z.boolean(),
  theme: z.enum(["purple", "blue"]).default("purple"),
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

export type Config = AppConfig;

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
