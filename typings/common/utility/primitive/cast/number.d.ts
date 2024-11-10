declare type ToNumber<Value extends string> = literalful<Value> extends never
  ? never
  : literalful<Value> extends literalful<Exclude<literalful<Value>, "0" | "-0" >>
    ? literalful<Value> extends `${infer Number extends number}`
      ? Numeric<Number>
      : never
    : literalful<Exclude<literalful<Value>, "0" | "-0" >> extends `${infer Number extends number}`
      ? Numeric<0 | Number>
      : never;
