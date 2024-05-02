declare type NewSetting = {
  app: NewAppSetting;
  user?: NewUserSetting;
};

declare type NewAppSetting = Record<string, string>;

declare type NewUserSetting = Record<string, string>;
