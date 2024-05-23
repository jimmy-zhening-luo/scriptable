declare type UnflatArray<
  I,
> = Array<
  Unflat<
    I
  >
>;

declare type Unflat<
  I,
> =
  | I
  | I[]
;

declare type Flat<
  A,
> = A extends Array<
  infer I
>
  ? I
  : A
;
