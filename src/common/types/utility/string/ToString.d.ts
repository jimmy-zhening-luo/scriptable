declare type ToString<
  O,
> = O extends Record<
  "toString"
  ,
  infer F
>
  ? F extends ()=> string
    ? ReturnType<F>
    : never
  : never;
