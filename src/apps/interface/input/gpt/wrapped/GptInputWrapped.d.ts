declare type GptInputWrapped =
  & Record<
    "prompt"
    ,
    GptInputUnwrapped
  >
  & GptPlugins
  & Partial<
    GptOpts
  >
  & Flag<
    "log"
  >
;
