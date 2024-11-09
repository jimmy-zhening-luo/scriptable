declare type ToNumber<Value extends string> = literalful<Value> extends never
  ? never
  : literalful<Value> extends literalful<Exclude<literalful<Value>, "0" | "-0" >>
    ? literalful<Value> extends `${infer Number extends number}`
      ? number extends Number
        ? never
        : Number
      : never
    : literalful<Exclude<literalful<Value>, "0" | "-0" >> extends `${infer Number extends number}`
      ? number extends Number
        ? never
        : 0 | Number
      : never;
