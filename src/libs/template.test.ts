// jest-environment-jsdom
import { describe, expect, it } from "vitest";
import { createEnvFromTab, evalTemplate, evalTemplateInTab } from "./template";
import type { Env } from "@/types";

describe("template utils", () => {
  const env: Env = { url: "https://example.com", title: "Example" };

  it("should create Env from tab", () => {
    const tab = {
      url: "https://test.com",
      title: "Test Title",
    } as chrome.tabs.Tab;
    expect(createEnvFromTab(tab)).toEqual({
      url: "https://test.com",
      title: "Test Title",
    });
  });

  it("should return undefined if tab has no url or title", () => {
    expect(createEnvFromTab({} as chrome.tabs.Tab)).toBeUndefined();
  });

  it("should render template with Mustache", () => {
    const template = "Title: {{{ title }}}, URL: {{{ url }}}";
    expect(evalTemplate(template, env)).toBe(
      "Title: Example, URL: https://example.com",
    );
  });

  it("should return undefined if template is invalid", () => {
    // Mustache is tolerant, so invalid template still returns a string
    expect(evalTemplate("{{{ notfound }}}", env)).toBe("");
  });

  it("should render template in tab", () => {
    const tab = { url: "https://foo.com", title: "Foo" } as chrome.tabs.Tab;
    const template = "[{{{ title }}}]({{{ url }}})";
    expect(evalTemplateInTab(template, tab)).toBe("[Foo](https://foo.com)");
  });
});
