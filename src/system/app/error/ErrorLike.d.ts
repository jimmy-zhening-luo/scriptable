declare const error: unique symbol;

declare type ErrorLike<E extends boolean = false> = { [error]: "ErrorLike" } & E extends true
  ? Error
  : string[] | Error | Partial<
    Record<
      "cause",
      Error
    >
  >;
