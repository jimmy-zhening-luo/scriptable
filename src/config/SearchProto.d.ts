declare interface SearchProto extends ApplicationConfigProto {
  user: SearchUserSettings;
  app?: SearchAppSettings;
}

declare interface SearchUserSettings extends Setting {
  engineKeys: Key[];
  queryTag?: string;
}

declare interface SearchAppSettings extends Setting {
  reservedKeys?: Key[];
  queryTag?: string;
}

declare interface Key extends Setting {
  keys: string | string[];
  urls?: string[];
  browser?: Browser;
  app?: SupportedApp;
  shortcut?: string;
}

declare type Browser =
  | "api"
  | "force"
  | "default";

declare type SupportedApp =
  | string;
