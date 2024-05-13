declare type ParsedUrl = {
  scheme: stringful;
  host: string;
  port: Nullable<posint>;
  _path: string;
  _query: string;
  _fragment: string;
};
