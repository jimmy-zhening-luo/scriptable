declare type Numeric<Number extends number> = Extract<Number, object> extends never
  ? number extends Number
    ? never
    : Number
  : never;
