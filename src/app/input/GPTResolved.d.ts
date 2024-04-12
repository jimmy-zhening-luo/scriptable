declare interface GPTResolved {
  prompt: string;

  token: number;
  temperature: number;
  model:
    | "ultra"
    | "high"
    | "low";
  preset: string;

}
