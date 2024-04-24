declare interface NewSetting {
  app: NewAppSetting;
  user?: NewUserSetting;
}

declare interface NewAppSetting {
  [key: string]: string;
}

declare interface NewUserSetting {
  [key: string]: string;
}
