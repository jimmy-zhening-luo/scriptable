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
> = String extends String
  ?
  literal<
    String
  > extends ""
    ? never
    : literal<
      String
    >
  : never;

declare type literal<
  String,
> = String extends string
  ? string extends String
    ? never
    : String
  : never;

  type litTest = literalful<"" | number>;
