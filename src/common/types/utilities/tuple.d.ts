declare type Monad<I> =
  Tuple<I, 1>;
declare type Dyad<I> =
  Tuple<I, 2>;
declare type Triad<I> =
  Tuple<I, 3>;
declare type Quad<I> =
  Tuple<I, 4>;
declare type Pentad<I> =
  Tuple<I, 5>;
declare type Hexad<I> =
  Tuple<I, 6>;
declare type Heptad<I> =
  Tuple<I, 7>;
declare type Octad<I> =
  Tuple<I, 8>;

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
