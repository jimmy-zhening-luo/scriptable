declare interface GPTSettings extends Config {
  user: GPTUserSettings;
  app: GPTAppSettings;
}

declare interface GPTUserSettings extends SettingMap {
  log: {
    enable: boolean;
    path: string;
  };
  defaults: {
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

declare interface GPTAppSettings extends SettingMap {
  presetTag: string;
  temperature: {
    min: number;
    max: number;
  };
  limits: {
    token: number;
    temperature: {
      min: number;
      max: number;
    };
  };
  models: {
    ultra: string;
    high: string;
    low: string;
  };
}
