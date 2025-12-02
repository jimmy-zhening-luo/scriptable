import type { Setting } from "./setting";

export interface Query {
  key?: stringful;
  terms?: stringful[];
  draft?: Setting["engines"][stringful];
  override?: Undefined<stringful>;
  prior?: boolean;
}
