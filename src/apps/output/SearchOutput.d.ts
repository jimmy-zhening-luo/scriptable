declare type SearchOutput = {
  app: string;
  actions: string | string[];
  natural?: string;
  browser?: BrowserAction;
  shortcut?: string;
  output?: boolean;
  "native"?: string;
};
