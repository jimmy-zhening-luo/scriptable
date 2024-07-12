declare type ErrorLike<Real extends boolean = false> = Real extends true
  ? Error
  :
    | primitive
    | primitive[]
    | Error
    | { cause?: ErrorLike }
;
