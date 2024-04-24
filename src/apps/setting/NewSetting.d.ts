declare type NewSetting = {
  app: NewAppSetting;
  user?: NewUserSetting;
};

declare type NewAppSetting = {
  [key: string]: string;
};

declare type NewUserSetting = {
  [key: string]: string;
};
