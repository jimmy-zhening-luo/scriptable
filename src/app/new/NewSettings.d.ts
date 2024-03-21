declare interface NewSettings extends Config {
  user?: NewUserSettings;
  app?: NewAppSettings;
}

declare interface NewUserSettings extends SettingMap {
  [key: string]: string;
}

declare interface NewAppSettings extends SettingMap {
  [key: string]: string;
}
