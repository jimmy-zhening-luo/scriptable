declare interface SearchSettings extends Config {
  app: SearchAppSettings;
  user: SearchUserSettings;
}

declare interface SearchUserSettings extends SettingMap {
  engines: SearchEngineSetting[];
}

declare interface SearchAppSettings extends SettingMap {
  queryTag: string;
  mathKeys?: string | string[];

}
