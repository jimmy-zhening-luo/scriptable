declare type ThingsSetting = {
  app: ThingsAppSetting;
  user: ThingsUserSetting;
};

declare type ThingsAppSetting = {
  tag: string;
  delims: {
    item: string;
    line: string;
  };
};

declare type ThingsUserSetting = {
  triage: string;
  lists: Record<string, string>;
};
