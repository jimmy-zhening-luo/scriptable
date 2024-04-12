declare interface GPTSetting extends Config {
  app: GPTAppSetting;
  user: GPTUserSetting;
}

declare interface GPTAppSetting extends SettingMap {
  presetTag: string;
  api: {
    host: string;
    version: string;
    action: string;
  };
  models: {
    ultra: string;
    high: string;
    low: string;
  };
  limit: {
    token: number;
    temperature: {
      min: number;
      max: number;
    };
  };
}

declare interface GPTUserSetting extends SettingMap {
  id: {
    token: string;
    org: string;
  };
  log: {
    enable: boolean;
    path: string;
  };
  "default": {
    token: number;
    temperature: number;
    model:
    | "ultra"
    | "high"
    | "low";
    preset: string;
  };
  presets: {
    [key: string?]: GPTPreset;
  };
}
