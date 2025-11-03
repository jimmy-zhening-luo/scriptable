declare type Literal<String extends string> = Extract<String, object> extends never
  ? string extends String
    ? never
    : String
  : never;
