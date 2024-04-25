declare type GPTInput =
  | GPTPrompt
  | GPTOptions;

declare type GPTPrompt = {
  system: string;
  user: string;
};

declare type GPTOptions = {
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
};
