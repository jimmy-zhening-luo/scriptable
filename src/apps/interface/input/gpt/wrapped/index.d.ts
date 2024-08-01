declare type GptInputWrapped =
  & { prompt: GptInputUnwrapped }
  & GptPlugins
  & Partial<GptOpts>
;
