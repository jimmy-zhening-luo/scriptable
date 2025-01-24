export interface SearchOutput {
  type: string;
  engine: Null<string>;
  question: string;
  urls: Null<readonly string[]>;
  notify: Null<true>;
}
