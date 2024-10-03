declare interface GptSetting {
  id: Field<"auth" | "org">;
  api: {
    host: string;
    version: string;
    actions: Field<
      | "chat"
      | "speech"
      | "transcribe"
      | "image"
    >;
  };
  models: Table<
    {
      name: string;
      action: Keys<GptSetting["api"]["action"]>;
    }
  >;
  defaults:
    & Field<"model">
    & Scalar<"temperature" | "p">
    & GptSetting["placeholders"]
  ;
  placeholders: Field<
    | "preset"
    | "location"
    | "date"
  >;
}
