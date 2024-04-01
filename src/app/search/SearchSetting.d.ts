declare interface SearchSettings extends Config {
  user: SearchUserSettings;
  app?: SearchAppSettings;
}

declare interface SearchUserSettings extends SettingMap {
  engines: EngineSetting[];
  queryTag?: string;
}

declare interface SearchAppSettings extends SettingMap {
  mathKeys?: string | string[];
  queryTag?: string;
}
