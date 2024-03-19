declare interface SearchSettings extends ApplicationSettings {
  user: SearchUserSettings;
  app?: SearchAppSettings;
}

declare interface SearchUserSettings extends Settings {
  engineKeys: Key[];
  queryTag?: string;
}

declare interface SearchAppSettings extends Settings {
  queryTag?: string;
}

declare interface Key extends Settings {
  keys: string | string[];
  urls?: string[];
  browser?: BrowserAction;
  app?: SupportedApp;
  shortcut?: string;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";

declare type SupportedApp =
  | string;
