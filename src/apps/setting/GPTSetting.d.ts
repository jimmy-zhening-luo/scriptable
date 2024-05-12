declare type GPTSetting = {
  app: GPTAppSetting;
  user: GPTUserSetting;
};

declare type GPTAppSetting = {
  presetTag: string;
  locationPlugin: string;
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
    p: {
      min: number;
      max: number;
    };
  };
};

declare type GPTUserSetting = {
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
    p: number;
    model:
      | "ultra"
      | "high"
      | "low";
    preset: string;
    location: string;
  };
  presets: Record<string, GPTPreset>;
};
