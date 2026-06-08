import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "vitest";

import {
  resolveActiveCodexHomeWritePath,
  resolveBaseCodexHomePath,
  resolveCodexHomeAllowlistCandidates,
  resolvePeakCodeCodexHomeOverlayPath,
  shouldDisablePeakCodeBrowserPlugin,
} from "./codexHomePaths.ts";

describe("resolveBaseCodexHomePath", () => {
  it("prefers the explicit home path over CODEX_HOME and the default", () => {
    assert.equal(
      resolveBaseCodexHomePath({ CODEX_HOME: "/env/codex" }, "/explicit/codex"),
      "/explicit/codex",
    );
  });

  it("falls back to CODEX_HOME when no explicit home is supplied", () => {
    assert.equal(resolveBaseCodexHomePath({ CODEX_HOME: "/env/codex" }), "/env/codex");
  });

  it("falls back to ~/.codex when nothing is provided", () => {
    const result = resolveBaseCodexHomePath({});
    assert.ok(result.endsWith(`${path.sep}.codex`));
  });
});

describe("resolvePeakCodeCodexHomeOverlayPath", () => {
  it("anchors the overlay under PEAKCODE_HOME when set", () => {
    assert.equal(
      resolvePeakCodeCodexHomeOverlayPath({ PEAKCODE_HOME: "/pc/runtime" }, "/users/me/.codex"),
      path.join("/pc/runtime", "codex-home-overlay"),
    );
  });

  it("honours the legacy PEAKCODE_HOME_LEGACY variable", () => {
    assert.equal(
      resolvePeakCodeCodexHomeOverlayPath(
        { PEAKCODE_HOME_LEGACY: "/legacy/runtime" },
        "/users/me/.codex",
      ),
      path.join("/legacy/runtime", "codex-home-overlay"),
    );
  });

  it("derives a default overlay sibling of the source home", () => {
    assert.equal(
      resolvePeakCodeCodexHomeOverlayPath({}, "/users/me/.codex"),
      path.join("/users/me", ".peakcode", "runtime", "codex-home-overlay"),
    );
  });
});

describe("shouldDisablePeakCodeBrowserPlugin", () => {
  it("disables the plugin (overlay active) by default", () => {
    assert.equal(shouldDisablePeakCodeBrowserPlugin({}), true);
  });

  it("respects the explicit '0' opt-out", () => {
    assert.equal(
      shouldDisablePeakCodeBrowserPlugin({ PEAKCODE_DISABLE_CODEX_PEAKCODE_BROWSER_PLUGIN: "0" }),
      false,
    );
  });
});

describe("resolveActiveCodexHomeWritePath", () => {
  it("returns the overlay home when the plugin is disabled (default)", () => {
    assert.equal(
      resolveActiveCodexHomeWritePath({
        env: { PEAKCODE_HOME: "/pc/runtime" },
        homePath: "/users/me/.codex",
      }),
      path.join("/pc/runtime", "codex-home-overlay"),
    );
  });

  it("returns the source home when the plugin is explicitly enabled", () => {
    assert.equal(
      resolveActiveCodexHomeWritePath({
        env: {
          PEAKCODE_HOME: "/pc/runtime",
          PEAKCODE_DISABLE_CODEX_PEAKCODE_BROWSER_PLUGIN: "0",
        },
        homePath: "/users/me/.codex",
      }),
      "/users/me/.codex",
    );
  });
});

describe("resolveCodexHomeAllowlistCandidates", () => {
  it("includes both source and overlay homes when distinct", () => {
    const candidates = resolveCodexHomeAllowlistCandidates({
      env: { PEAKCODE_HOME: "/pc/runtime" },
      homePath: "/users/me/.codex",
    });
    assert.deepEqual(candidates, [
      "/users/me/.codex",
      path.join("/pc/runtime", "codex-home-overlay"),
    ]);
  });

  it("returns just the source when overlay equals source", () => {
    const candidates = resolveCodexHomeAllowlistCandidates({
      env: { PEAKCODE_HOME: "/users/me" },
      homePath: path.join("/users/me", "codex-home-overlay"),
    });
    assert.deepEqual(candidates, [path.join("/users/me", "codex-home-overlay")]);
  });
});
