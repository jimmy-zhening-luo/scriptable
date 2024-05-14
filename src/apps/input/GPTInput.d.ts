declare type GPTInput =
  | GPTPrompt
  | GPTInputOptions
;

declare type GPTPrompt = {
  system: string;
  user: string;
};

declare type GPTInputOptions = {
  prompt:
    | string
    | GPTPrompt;
  token?: number;
  temperature?: number;
  p?: number;
  model?:
    | "ultra"
    | "high"
    | "low";
  preset?: string;
  location?: string;
};
