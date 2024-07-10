declare type GptInputWrapped =
  & Record<"prompt", GptInputUnwrapped>
  & GptPlugins
  & Partial<GptOpts>
;
