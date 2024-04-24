declare interface HelloSetting extends Config {
  app: NewAppSetting;
}

declare interface HelloAppSetting extends SettingMap {
  space: string;
}
