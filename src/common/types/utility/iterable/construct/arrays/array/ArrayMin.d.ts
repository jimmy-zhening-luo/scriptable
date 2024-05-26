declare type ArrayMin<
  I,
  L extends number,
  Head extends I[] = [],
> = L extends L
  ? number extends L
    ? never
    : Head[
      "length"
    ] extends L
      ? [
          ...Head,
          ...I[],
        ]
      : ArrayMin<
        I
        ,
        L
        ,
        [
          ...Head,
          I,
        ]
      >
  : never;
