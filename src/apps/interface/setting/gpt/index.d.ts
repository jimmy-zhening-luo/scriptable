declare interface GptSetting {
  id: Field<"auth" | "org">;
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
  models: Table<
    {
      id: string;
      action: Keys<GptSetting["api"]["action"]>;
    }
  >;
  defaults:
    & Field<"model">
    & Scalar<"temperature" | "p">
    & GptSetting["plugins"]
  ;
  plugins: Field<
    | "preset"
    | "location"
    | "date"
  >;
}
