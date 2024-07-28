export {};

declare global {
  function importModule<T = typeof Shortcut>(path: string): T;
}
