declare interface SearchOutput {
  query: {
    key: string;
    terms: string[];
  };
  app: string;
  actions: string | string[];
  shortcut?: string;
  native?: string;
  browser?: BrowserAction;
}
