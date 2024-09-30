declare type GptInputWrap =
  & { prompt: GptPrompt }
  & GptPlugins
  & Partial<GptOpts>
;
