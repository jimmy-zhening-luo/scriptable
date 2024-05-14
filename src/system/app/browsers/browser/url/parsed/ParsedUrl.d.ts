declare type ParsedUrl = {
  scheme: stringful;
  host: string;
  port: Nullable<posint>;
  path: string;
  query: string;
  fragment: string;
};
