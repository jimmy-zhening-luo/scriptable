export interface SearchOutput {
  engine: Null<string>;
  action: (
    | null
    | stringful
    | readonly string[]
  );
  notify: Null<true>;
  label: string;
}
