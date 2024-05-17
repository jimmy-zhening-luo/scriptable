declare type Oneple<T> = Tuple<T, 1>;
declare type Twople<T> = Tuple<T, 2>;
declare type Threeple<T> = Tuple<T, 3>;
declare type Fourple<T> = Tuple<T, 4>;
declare type Fiveple<T> = Tuple<T, 5>;
declare type Sixple<T> = Tuple<T, 6>;
declare type Sevenple<T> = Tuple<T, 7>;
declare type Eightple<T> = Tuple<T, 8>;
declare type Nineple<T> = Tuple<T, 9>;
declare type Tenple<T> = Tuple<T, 10>;

declare type Arrayful<T> = ArrayMin<T, 1>;
declare type Array2<T> = ArrayMin<T, 2>;
declare type Array3<T> = ArrayMin<T, 3>;
declare type Array4<T> = ArrayMin<T, 4>;
declare type Array5<T> = ArrayMin<T, 5>;

declare type Tuple<T, Length extends number> = Length extends Length
  ? number extends Length
    ? T[]
    : BuildTuple<T, Length, []>
  : never;

declare type ArrayMin<T, Length extends number> = Length extends Length
  ? number extends Length
    ? never
    : BuildArray<T, Length, []>
  : never;

type BuildTuple<
  T,
  Length extends number,
  Rest extends unknown[]
> = Rest['length'] extends Length
  ? Rest
  : BuildTuple<T, Length, [T, ...Rest]>;

type BuildArray<
  T,
  Length extends number,
  Head extends T[]
> = Head['length'] extends Length
  ? [...Head, ...T[]]
  : BuildArray<T, Length, [...Head, T]>;
