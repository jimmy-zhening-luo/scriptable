declare type Unflat<
  Inner,
  Mutable extends boolean = false,
> =
  | Inner
  | (
    Mutable extends true
      ? Inner[]
      : readonly Inner[]
  )
;

declare type UnflatArray<
  Inner,
  Mutable extends boolean = false,
> = Unflat<
  Inner,
  Mutable
>[];
