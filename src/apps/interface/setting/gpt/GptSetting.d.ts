declare type GptSetting = {
  app: {
    api:
      & Field<
        | "host"
        | "version"
      >
      & Record<
        "action",
        | Field<
          | GptModel
        >
      >
    ;
    models: Field<
      | GptModel
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
      | GptPreset
    >;
  };
};
