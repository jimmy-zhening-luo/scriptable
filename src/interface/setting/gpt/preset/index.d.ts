declare interface GptPreset {
  prompt: Partial<GptPromptful>;
  model?: string;
  slider?: Partial<GptSetting["defaults"]["slider"]>;
  placeholder?: Partial<GptSetting["defaults"]["placeholder"]>;
  plugins?: FieldTable;
}
