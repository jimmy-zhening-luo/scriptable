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
  app?: string;
  urls?: string | string[];
  browser?: BrowserAction;
}

declare type BrowserAction =
  | "api"
  | "force"
  | "default";
