declare interface GptPreset {
  prompt: Field<never, "system" | "user">;
  model?: string;
  sliders?: Partial<GptSetting["defaults"]["sliders"]>;
  placeholders?: Partial<GptSetting["defaults"]["placeholders"]>;
  plugins?: FieldTable;
}
