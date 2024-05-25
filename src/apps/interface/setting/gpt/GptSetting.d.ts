declare type GptSetting = {
  app: {
    api: Field<
      | "host"
      | "version"
      | "action"
    >;
    models: Field<
      | "stable"
      | "legacy"
      | "tts"
      | "image"
      | "transcribe"
      | "preview"
    >;
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
    presets: Table<
      GptPreset
    >;
  };
};
