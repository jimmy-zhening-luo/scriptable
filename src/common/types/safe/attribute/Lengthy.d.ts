declare const length: unique symbol;
type OldLength<L> = { [length]: L };

declare type Lengthy<
  L extends number,
  T,
> =
  & T
  & OldLength<
    L
  >;

declare type Length<
  L extends number,
> = { length: L };

declare type Head<
  I,
> = { 0: I };
