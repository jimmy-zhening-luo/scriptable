declare type Strung<
  O,
> = O extends Record<
  "toString"
  ,
  infer F
>
  ? F extends ()=> string
    ? ReturnType<
      F
    >
    : never
  : O extends Record<
    "string"
    ,
    infer S
  >
    ? S extends string
      ? S
      : never
    : never;
