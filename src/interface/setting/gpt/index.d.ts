declare interface GptSetting {
  id: Field<
    | "auth"
    | "org"
  >;
  api: {
    host: string;
    version: string;
    actions: Field<GptAction>;
  };
  models: Table<{
    name: string;
    action: GptAction;
  }>;
  defaults: {
    model: string;
    preset: string;
    slider: Scalar<GptSlider>;
    placeholder: Field<Exclude<GptPlaceholder, "insert">>;
  };
  placeholders: Field<GptPlaceholder>;
}
