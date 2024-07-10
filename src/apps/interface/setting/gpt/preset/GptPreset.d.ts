declare type GptPreset =
  & GptPlugins
  & Unrequire<
    GptPromptful,
    | "user"
  >
;
