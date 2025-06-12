export interface SearchOutput {
  engine: Null<string>;
  action: (
    | null
    | stringful
    | readonly stringful[]
  );
  notify: Null<true>;
  label: string;
}
