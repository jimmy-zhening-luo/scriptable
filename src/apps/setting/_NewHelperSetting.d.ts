declare type NewHelperSetting = {
  app: NewHelperAppSetting;
  user?: NewHelperUserSetting;
};

declare type NewHelperAppSetting = Record<string, string>;

declare type NewHelperUserSetting = Record<string, string>;
