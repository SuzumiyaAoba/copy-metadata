/**
 * Represents the metadata environment for a web page (title and URL).
 * Used for template rendering and metadata storage.
 */
export type Env = {
  url: string;
  title: string;
};

/**
 * Template definition for metadata rendering.
 */
export type Template = {
  template: string;
};

/**
 * Templates collection.
 */
export type Templates = Record<string, Template>;

/**
 * Theme definition.
 */
export type Theme = "purple" | "blue";

/**
 * App configuration.
 */
export type AppConfig = {
  version: number;
  templates: Templates;
  enabledTemplate: { name: string; template: string };
  copyOnIconClick: boolean;
  theme: Theme;
  copyDuration: number;
};
