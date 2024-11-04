declare interface SearchOutput {
  action: Unflat;
  app: string;
  output: Null<true>;
  find?: string;
  shortcut?: string;
  browser?: string;
  schemes?: string[];
  api?: Null<true>;
  inprivate?: Null<true>;
  natural?: string;
}
