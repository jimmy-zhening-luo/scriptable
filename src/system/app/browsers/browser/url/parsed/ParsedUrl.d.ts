declare type ParsedUrl = {
  scheme: stringful;
  host: string;
  port: Nullable<posint>;
  path?: string[];
  query?: Record<string, string>;
  fragment?: string;
};
