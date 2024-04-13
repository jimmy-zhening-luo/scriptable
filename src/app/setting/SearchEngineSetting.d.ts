declare type SearchEngineSetting =
  | AppEngineSetting
  | BrowserEngineSetting;

declare interface ISearchEngineSetting {
  keys: string | string[];
}

declare interface AppEngineSetting extends ISearchEngineSetting {
  app: string;
}

declare interface BrowserEngineSetting extends ISearchEngineSetting {
  url: string | string[];
  browser?: BrowserAction;
  encode?: BrowserEncode;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";

declare type BrowserEncode =
  | "%20"
  | "default";
