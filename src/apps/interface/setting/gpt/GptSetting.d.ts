declare type GptSetting = {
  app: {
    api: { action: Field<GptModel> } & Field<"host" | "version">;
    models: Field<GptModel>;
    limit: Limit<
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
    id: Field<
      | "token"
      | "org"
    >;
    defaults: GptOpts;
    presets: Table<GptPreset>;
  };
};
