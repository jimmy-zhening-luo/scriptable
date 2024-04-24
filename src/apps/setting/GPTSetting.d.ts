declare interface GPTSetting {
  app: GPTAppSetting;
  user: GPTUserSetting;
}

declare interface GPTAppSetting {
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
    p: {
      min: number;
      max: number;
    };
  };
}

declare interface GPTUserSetting {
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
  };
  presets: {
    [key: string?]: GPTPreset;
  };
}
