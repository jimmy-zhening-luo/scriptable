declare type GptInputWrapped =
  & Record<
    "prompt"
    ,
    GptInputUnwrapped
  >
  & Partial<
    GptOpts
  >
  & PartialRecord<
    "plugins"
    ,
    FieldTable
  >
;
