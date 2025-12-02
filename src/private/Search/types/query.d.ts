import type { Setting } from "./setting";

export interface Query {
  key?: stringful;
  terms?: stringful[];
  manifest?: Exclude<Setting["engines"][stringful], string>;
  prior?: boolean;
}
