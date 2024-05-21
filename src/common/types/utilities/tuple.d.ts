declare type Oneple<I> = Tuple<I, 1>;
declare type Twople<I> = Tuple<I, 2>;
declare type Threeple<I> = Tuple<I, 3>;
declare type Fourple<I> = Tuple<I, 4>;
declare type Fiveple<I> = Tuple<I, 5>;
declare type Sixple<I> = Tuple<I, 6>;
declare type Sevenple<I> = Tuple<I, 7>;
declare type Eightple<I> = Tuple<I, 8>;

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
        I,
        Length,
        [
          ...Head,
          I,
        ]
      >
  : never;
