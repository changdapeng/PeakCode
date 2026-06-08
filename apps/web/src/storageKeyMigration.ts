// FILE: storageKeyMigration.ts
// Purpose: Migrates legacy browser storage keys to the PeakCode namespace.
// Layer: Web bootstrap utility
// Exports: migratePeakCodeLocalStorageKeys

const STORAGE_KEY_MIGRATIONS = [
  ["t3code:renderer-state:v8", "peakcode:renderer-state:v8"],
  ["t3code:composer-drafts:v1", "peakcode:composer-drafts:v1"],
  ["t3code:split-view-state:v1", "peakcode:split-view-state:v1"],
  ["t3code:sidebar-ui:v1", "peakcode:sidebar-ui:v1"],
  ["t3code:single-chat-panel-state:v1", "peakcode:single-chat-panel-state:v1"],
  ["t3code:terminal-state:v1", "peakcode:terminal-state:v1"],
  ["t3code:latest-project:v1", "peakcode:latest-project:v1"],
  ["t3code:app-settings:v1", "peakcode:app-settings:v1"],
  ["t3code:pinned-threads:v1", "peakcode:pinned-threads:v1"],
  ["t3code:browser-state:v1", "peakcode:browser-state:v1"],
  ["t3code:workspace-pages:v2", "peakcode:workspace-pages:v2"],
  ["t3code:theme", "peakcode:theme"],
  ["t3code:last-editor", "peakcode:last-editor"],
  ["t3code:last-invoked-script-by-project", "peakcode:last-invoked-script-by-project"],
  ["t3code:browser-perf", "peakcode:browser-perf"],
  ["t3code:server-settings-migrated:v1", "peakcode:server-settings-migrated:v1"],
] as const;

export function migratePeakCodeLocalStorageKeys(): void {
  // Prefer globalThis.localStorage so this works identically in browsers (where
  // globalThis === window) and in node-based unit tests that stub the global.
  let storage: Storage | null = null;
  try {
    storage = globalThis.localStorage ?? null;
  } catch {
    return;
  }
  if (!storage) {
    return;
  }

  try {
    for (const [legacyKey, nextKey] of STORAGE_KEY_MIGRATIONS) {
      if (storage.getItem(nextKey) !== null) {
        continue;
      }
      const legacyValue = storage.getItem(legacyKey);
      if (legacyValue !== null) {
        storage.setItem(nextKey, legacyValue);
      }
    }
  } catch {
    // Storage can be unavailable in private/sandboxed contexts; the app should still boot.
  }
}

// Run during bootstrap before stores hydrate from localStorage.
migratePeakCodeLocalStorageKeys();
