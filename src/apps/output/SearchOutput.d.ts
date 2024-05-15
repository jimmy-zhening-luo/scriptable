declare type SearchOutput = {
  app: string;
  action:
    | string
    | string[]
  ;
  natural?: string;
  browser?: UrlEngine["browser"];
  shortcut?: string;
  output?: boolean;
  find?: string;
};
