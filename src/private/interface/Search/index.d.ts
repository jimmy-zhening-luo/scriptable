export type { SearchSetting } from "./setting";
export interface SearchOutput {
  engine: Null<string>;
  question: Null<stringful>;
  action: (
    | typeof SearchOutput["question"]
    | readonly string[]
  );
  notify: Null<true>;
  label: stringful;
}
