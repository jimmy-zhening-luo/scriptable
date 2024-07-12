declare type GptInputWrapped =
  & Recordful<"prompt", GptInputUnwrapped>
  & GptPlugins
  & Partial<GptOpts>
;
