declare type Stringify<
  Stringlike,
> = Stringlike extends Stringlike
  ? Stringlike extends Record<
    "string"
    ,
    infer Member
  >
    ? Member extends string
      ? Member
      : never
    : Stringlike extends Record<
      "toString"
      ,
      infer Function
    >
      ? Function extends ()=> string
        ? ReturnType<
          Function
        >
        : never
      : never
  : never;
