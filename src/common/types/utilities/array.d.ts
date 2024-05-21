declare type Arrayful<I> = ArrayN<I, 1>;

declare type ArrayN<
  I,
  Length extends number,
  Head extends I[] = [],
> = Length extends Length
  ? number extends Length
    ? never
    : Head[
      "length"
    ] extends Length
      ? [
          ...Head,
          ...I[],
        ]
      : ArrayN<
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
