declare type ErrorLike<
  Confirmed extends boolean = false,
> = Confirmed extends true
  ? Error
  :
    | primitive
    | primitive[]
    | Error
    | { cause?: ErrorLike }
;
