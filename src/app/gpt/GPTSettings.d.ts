declare interface GPTSettings extends Config {
  app: GPTAppSettings;
  user: GPTUserSettings;
}

declare interface GPTAppSettings extends SettingMap {
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

declare interface GPTUserSettings extends SettingMap {
  id: {
    token: string;
    org: string;
  };
  log: {
    enable: boolean;
    path: string;
  };
  default: {
    token: number;
    temperature: number;
    model:
    | "ultra"
    | "high"
    | "low";
    preset: string;
  };
  presets: {
    [key: string?]: PresetPrompt;
  };
}
