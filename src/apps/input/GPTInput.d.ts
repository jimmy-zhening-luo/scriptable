declare type GPTInput =
  | GPTPrompt
  | GPTPromptOptions
;

declare type GPTPrompt =
  | string
  | Record<"system" | "user", string>
;

declare type GPTPromptOptions = Record<
  "prompt",
  GPTPrompt
> & Partial<GPTOptions>;
