declare type Tuple<
  I,
  Length extends number,
  Head extends I[] = [],
> = Length extends Length
  ? number extends Length
    ? never
    : Head[
      "length"
    ] extends Length
      ? Head
      : Tuple<
        I
        ,
        Length
        ,
        [
          ...Head,
          I,
        ]
      >
  : never;
