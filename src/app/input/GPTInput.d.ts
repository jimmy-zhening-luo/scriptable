declare interface GPTInput {
  [key: string]: unknown;
  prompt: string;

  token?: number;
  temperature?: number;
  model?:
    | "ultra"
    | "high"
    | "low";
  preset?: string;
}
