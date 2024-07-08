declare type ErrorLike<
  RealError extends boolean = false,
> = RealError extends true
  ? Error
  :
    | string[]
    | Error
    | { cause?: Error }
;
