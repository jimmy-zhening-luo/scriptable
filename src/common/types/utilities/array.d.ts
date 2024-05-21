declare type Arrayful<I> = ArrayMin<I, 1>;

declare type ArrayMin<
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
      : ArrayMin<
        I,
        Length,
        [
          ...Head,
          I,
        ]
      >
  : never;
