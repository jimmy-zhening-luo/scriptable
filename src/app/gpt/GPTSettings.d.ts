declare interface GPTSettings extends ApplicationSettings {
  user: GPTUserSettings;
  app: GPTAppSettings;
}

declare interface GPTUserSettings extends Settings {
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
    [key: string]: Preset;
  };
}

declare interface GPTAppSettings extends Settings {
  promptTag: string;
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
