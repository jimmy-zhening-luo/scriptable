declare type ParsedUrl = {
  scheme: stringful;
  host: string;
  port: Null<posint>;
  path: string;
  query: string;
  fragment: string;
};
