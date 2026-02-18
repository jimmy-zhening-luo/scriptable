import type { Response } from "./response";

export type Output
= | null
  | { answer: unknown }
  | {
      tool: string;
      task: unknown;
    };
