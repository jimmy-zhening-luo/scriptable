declare type ArrayMin<
  Inner,
  Length extends number,
  Head extends Inner[] = [],
> = Length extends Length
  ? number extends Length
    ? Inner[]
    : 0 extends Length
      ? Inner[]
      : Head[
        "length"
      ] extends Length
        ? [
            ...Head,
            ...Inner[],
          ]
        : ArrayMin<
          Inner
          ,
          Length
          ,
          [
            ...Head,
            Inner,
          ]
        >
  : never;
