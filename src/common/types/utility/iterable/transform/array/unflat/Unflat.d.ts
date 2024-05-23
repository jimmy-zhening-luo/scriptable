declare type UnflatArray<
  I,
> = Unflat<
  I
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
