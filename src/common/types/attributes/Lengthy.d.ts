declare const length: unique symbol;

type OldLength<L> = { [length]: L };

declare type Lengthy<L extends number, T> = T & OldLength<L>;

declare type Length<L extends number> = { length: L };

declare type Head<I> = { 0: I };

declare type SafeIterable<
  L extends number,
  I,
> = L extends 0
  ? never
  : Length<L> & Head<I>;

declare type StringLength<
  L extends number,
  S extends stringful,
  S0 extends stringful = S,
> =
  & S
  & SafeIterable<
    L,
    S0 & Length<1>
  >;
