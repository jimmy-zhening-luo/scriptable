declare interface GptSetting {
  app: {
    api: {
      host: string;
      version: string;
      action: Record<keyof GptSetting["app"]["models"], string>;
    };
    models: FieldTable;
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
