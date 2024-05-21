declare type GptInput =
  | GptInputFullyWrapped
  | GptInputPrompt
;

declare type GptInputFullyWrapped =
  & Record<
    "prompt",
    GptInputPrompt
  >
  & Partial<
    GptProps
  >
;

declare type GptInputPrompt =
  | string
  | Record<
    | "system"
    | "user"
    ,
    string
  >
;
