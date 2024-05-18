declare type Oneple<I> = Tuple<I, 1>;
declare type Twople<I> = Tuple<I, 2>;
declare type Threeple<I> = Tuple<I, 3>;
declare type Fourple<I> = Tuple<I, 4>;
declare type Fiveple<I> = Tuple<I, 5>;
declare type Sixple<I> = Tuple<I, 6>;
declare type Sevenple<I> = Tuple<I, 7>;
declare type Eightple<I> = Tuple<I, 8>;
declare type Nineple<I> = Tuple<I, 9>;
declare type Tenple<I> = Tuple<I, 10>;

declare type Arrayful<I> = ArrayMin<I, 1>;
declare type Array2<I> = ArrayMin<I, 2>;
declare type Array3<I> = ArrayMin<I, 3>;
declare type Array4<I> = ArrayMin<I, 4>;
declare type Array5<I> = ArrayMin<I, 5>;

declare type Tuple<I, L extends number> = I[] & Indexable<L, I>;

declare type ArrayMin<I, L extends number> = L extends L
  ? number extends L
    ? never
    : BuildArray<I, L, []>
  : never;

type BuildArray<
  I,
  L extends number,
  Head extends I[],
> = Head["length"] extends L
  ? [...Head, ...I[]]
  : BuildArray<I, L, [...Head, I]>;
