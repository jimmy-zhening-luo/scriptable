declare type SearchOutput = {
  app: string;
  actions: string | string[];
  natural?: string;
  browser?: UrlEngine["browser"];
  shortcut?: string;
  output?: boolean;
  "native"?: string;
};
