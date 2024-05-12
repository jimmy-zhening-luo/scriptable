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
