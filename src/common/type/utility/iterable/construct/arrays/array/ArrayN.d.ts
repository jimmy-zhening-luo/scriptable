declare type ArrayN<
  Inner,
  Length,
  Head extends Inner[] = [],
> = [Inner] extends [never]
  ? never
  : Length extends number
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
          : ArrayN<
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
