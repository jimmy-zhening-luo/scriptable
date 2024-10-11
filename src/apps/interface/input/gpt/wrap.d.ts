declare type GptInputWrap =
  & {
    prompt: GptPrompt;
    model?: string;
    preset?: string;
    plugins?: FieldTable;
  }
  & Partial<GptSetting["defaults"]["slider"]>
  & Partial<GptSetting["defaults"]["placeholder"]>
;
