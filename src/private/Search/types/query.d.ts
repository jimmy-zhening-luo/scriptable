import type { Setting } from "./setting";

export interface Query {
  key?: stringful;
  terms?: stringful[];
  manifest?: Setting["engines"][stringful];
  prior?: boolean;
}
