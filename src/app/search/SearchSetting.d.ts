declare interface SearchSetting extends Config {
  user: SearchUserSetting;
  app?: SearchAppSetting;
}

declare interface SearchUserSetting extends SettingMap {
  engines: EngineSetting[];
  queryTag?: string;
}

declare interface SearchAppSetting extends SettingMap {
  queryTag?: string;
}
