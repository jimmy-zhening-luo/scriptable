declare type GptOpts =
  & { plugins?: FieldTable }
  & Partial<GptSetting["defaults"]>;
