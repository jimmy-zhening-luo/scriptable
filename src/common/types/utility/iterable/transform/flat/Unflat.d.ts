declare type Unflat<
  I,
> =
  | I
  | I[]
;

declare type UnflatArray<
  I,
> = Array<
  Unflat<
    I
  >
>;
