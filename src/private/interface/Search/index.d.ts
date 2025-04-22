export type { SearchSetting } from "./setting";
export interface SearchOutput {
  type: string;
  engine: Null<string>;
  question: Null<stringful>;
  urls: Null<readonly string[]>;
  notify: Null<true>;
  label: string;
}
