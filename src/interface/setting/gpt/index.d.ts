declare interface GptSetting {
  header: Field<
    | "auth"
    | "org"
  >;
  api: {
    host: string;
    version: string;
    actions: Field<
      | "chat"
      | "speech"
      | "transcribe"
      | "image">;
  };
  models: Table<{
    model: string;
    action: keyof GptSetting["api"]["actions"];
  }>;
  tags: {
    prompt: string;
    placeholders: Field<
      | "date"
      | "location"
    >;
  };
  defaults: {
    model: string;
    preset: string;
    sliders: Scalar<
      | "temperature"
      | "top_p"
    >;
    placeholders: GptSetting["tags"]["placeholders"];
  };
}
