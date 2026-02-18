export type Output
= | null
  | { answer: unknown }
  | {
    tool: string;
    task: unknown;
  };
