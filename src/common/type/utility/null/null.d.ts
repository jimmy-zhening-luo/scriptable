declare type Null<
  Type,
> =
  | null
  | Type
;

declare type Nullable<
  Type,
> =
  Null<
    NonNullable<
      Type
    >
  >;
