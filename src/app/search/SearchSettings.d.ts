declare interface SearchSettings extends Config {
  user: SearchUserSettings;
  app?: SearchAppSettings;
}

declare interface SearchUserSettings extends SettingMap {
  engines: Engine[];
  queryTag?: string;
}

declare interface SearchAppSettings extends SettingMap {
  queryTag?: string;
}

declare interface Engine extends SettingMap {
  keys: string | string[];
  app?: string;
  urls?: string | string[];
  browser?: BrowserAction;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";
