declare interface SearchOutput {
  query: {
    key: string;
    terms: string[];
  };
  app: string;
  actions: string[];
  browser?: BrowserAction;
}
