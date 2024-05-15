declare type GPTSetting = {
  app: {
    tags: Record<
      | "preset"
      | "location"
      ,
      string
    >;
    plugins: Record<
      | "location"
      ,
      string
    >;
    api: Record<"host" | "version" | "action", string>;
    models: Record<
      | "ultra"
      | "high"
      | "low"
      ,
      string
    >;
    limit: {
      token: number;
      temperature: MinMaxLimit;
      p: MinMaxLimit;
    };
  };
  user: {
    id: Record<"token" | "org", string>;
    defaults: GPTOptions;
    presets: Record<string, GPTPreset>;
  };
};

declare type GPTOptions = {
  preset: string;
  location: string;
  model: keyof GPTSetting["app"]["models"];
} & Record<
  keyof GPTSetting["app"]["limit"],
  number
>;

declare type GPTPreset = {
  system: string;
  user?: string;
};

declare type MinMaxLimit = Record<"min" | "max", number>;
