declare type EngineSetting =
  | AppEngineSetting
  | BrowserEngineSetting;

declare interface IEngineSetting {
  keys: string | string[];
}

declare interface AppEngineSetting extends IEngineSetting {
  app: string;
}

declare interface BrowserEngineSetting extends IEngineSetting {
  urls: string | string[];
  browser?: BrowserAction;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";
