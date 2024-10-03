declare type GptPreset =
  & Partial<GptPromptful>
  & { plugins: FieldTable }
  & Partial<GptSetting["defaults"]>
;
