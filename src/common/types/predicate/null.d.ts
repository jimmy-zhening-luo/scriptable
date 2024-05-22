declare type Null<
  O,
> =
  | null
  | O
;

declare type Nullable<
  O,
> =
  Null<
    NonNullable<
      O
    >
  >;
