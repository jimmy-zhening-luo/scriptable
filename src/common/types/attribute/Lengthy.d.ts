declare const length: unique symbol;

type OldLength<L> = { [length]: L };

declare type Lengthy<L extends number, T> = T & OldLength<L>;


type Length<L> = { length: L };

type Head<I> = { 0: I };

type Iterable<
  I,
  L extends number,
> = Length<L> & Head<I>;

declare type NewLengthy<
  T extends iterable,
  L extends number,
> = L extends 0
  ? never
  : T & Iterable<
    T extends Array<infer I> ? I : T,
    L
  >
;
