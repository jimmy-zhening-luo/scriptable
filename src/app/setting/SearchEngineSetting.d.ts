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
  urls: string | string[];
  browser?: BrowserAction;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";
