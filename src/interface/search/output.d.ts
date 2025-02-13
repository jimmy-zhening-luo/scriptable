export interface SearchOutput {
  type: string;
  engine: Null<string>;
  question: Null<string>;
  urls: Null<readonly string[]>;
  notify: Null<true>;
}
