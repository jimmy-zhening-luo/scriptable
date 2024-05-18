declare const length: unique symbol;

type OldLength<L> = { [length]: L };

declare type Lengthy<L extends number, T> = T & OldLength<L>;

type Length<L extends number> = { length: L };
type Head<I> = { 0: I };

declare type Indexable<
  L extends number,
  I,
> = L extends 0
  ? never
  : Length<L> & Head<I>
;

declare type StringLength<
  L extends number,
  S extends stringful,
  S0 extends stringful = S,
> =
  & S
  & Indexable<L, S0>
;
