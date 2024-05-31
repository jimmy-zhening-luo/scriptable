declare type Unflat<
  Inner,
> =
  | Inner
  | Inner[]
;

declare type UnflatArray<
  Inner,
> = Array<
  Unflat<
    Inner
  >
>;

type UTest = Unflat<number | string>;
