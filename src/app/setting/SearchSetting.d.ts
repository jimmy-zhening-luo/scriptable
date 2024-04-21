declare interface SearchSettings extends Config {
  app: SearchAppSettings;
  user: SearchUserSettings;
}

declare interface SearchUserSettings extends SettingMap {
  engines: SearchEngineSetting[];
}

declare interface SearchAppSettings extends SettingMap {
  tag: string;
  chat: string;
  translate: string;
  math?: string[];

}
