declare type GptSetting = {
  app: {
    tags: Field<
      | "preset"
      | "location"
    >;
    plugins: Field<
      "location"
    >;
    api: Field<
      | "host"
      | "version"
      | "action"
    >;
    models: Field<
      | "ultra"
      | "fast"
      | "beta"
      | "image"
      | "tts"
      | "transcript"
    >;
    limit: Limit<
      | "token"
      | "temperature"
      | "p"
    >;
  };
  user: {
    id: Field<
      | "token"
      | "org"
    >;
    defaults: GptProps;
    presets: Table<
      Unrequire<
        GptPrompt
        ,
        | "user"
      >
    >;
  };
};
