declare interface NewSetting extends Config {
  app?: NewAppSetting;
  user?: NewUserSetting;
}

declare interface NewAppSetting extends SettingMap {
  [key: string]: string;
}

declare interface NewUserSetting extends SettingMap {
  [key: string]: string;
}
