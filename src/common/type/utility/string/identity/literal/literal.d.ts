declare type literals<
  Strings,
> = literalful<
  Extract<
    Strings
    ,
    string
  >
>;

declare type literalful<
  String,
> = [String] extends [string]
  ? string extends String
    ? never
    : "" extends String
      ? never
      : String
  : never;

declare type literal<
  String,
> = [String] extends [string]
  ? string extends String
    ? never
    : String
  : never;
