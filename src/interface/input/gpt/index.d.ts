declare type GptInput =
  | GptPrompt
  | (
    & {
      prompt: GptPrompt;
      model?: string;
      preset?: string;
      plugins?: FieldTable;
    }
    & Partial<GptSetting["defaults"]["sliders"]>
    & Partial<GptSetting["defaults"]["placeholders"]>
  )
;
