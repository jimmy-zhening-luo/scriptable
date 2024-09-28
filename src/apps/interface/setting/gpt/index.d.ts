declare interface GptSetting {
  app: {
    api: {
      host: string;
      version: string;
      action: Field<GptModel>;
    };
    models: Field<GptModel>;
    limits: Limit<
      | "token"
      | "temperature"
      | "p"
    >;
    tags: Field<
      | "preset"
      | "location"
      | "date"
    >;
  };
  user: {
    id: Field<"auth" | "org">;
    defaults: GptOpts;
    presets: Table<GptPreset>;
  };
}
