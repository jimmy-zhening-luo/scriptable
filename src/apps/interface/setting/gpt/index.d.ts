declare interface GptSetting {
  app: {
    api: {
      host: string;
      version: string;
      action: Field<
        | "chat"
        | "speech"
        | "transcribe"
        | "image"
      >;
    };
    models: Table<GptModel>;
    limits: Limit<
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
