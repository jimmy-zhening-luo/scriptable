export {};

declare global {
  function importModule<T>(path: string): T;

}
