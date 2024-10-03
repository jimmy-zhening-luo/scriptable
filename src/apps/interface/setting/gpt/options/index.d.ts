declare type GptOptions =
  & Partial<GptSetting["defaults"]>
  & { plugins?: FieldTable }
;
