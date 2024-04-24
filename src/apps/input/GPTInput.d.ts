declare interface GPTInput {
  prompt:
    | string
    | {
      system: string;
      user: string;
    };
  token?: number;
  temperature?: number;
  p?: number;
  model?:
    | "ultra"
    | "high"
    | "low";
  preset?: string;
}
