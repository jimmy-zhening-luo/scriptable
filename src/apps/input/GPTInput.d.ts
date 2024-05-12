declare type GPTInput =
  | GPTPrompt
  | GPTInputOptions
;

declare type GPTPrompt = {
  system: string;
  user: string;
};
