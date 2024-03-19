declare interface NewSettings extends ApplicationSettings {
  user?: NewUserSettings;
  app?: NewAppSettings;
}

declare interface NewUserSettings extends Settings {
  [key: string]: string;
}

declare interface NewAppSettings extends Settings {
  [key: string]: string;
}
