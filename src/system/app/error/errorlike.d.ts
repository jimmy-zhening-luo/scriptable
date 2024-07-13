declare type ErrorLike<Real = false> = Real extends false
  ?
  | Error
  | { cause?: ErrorLike }
  | Unflat<primitive>
  : Error
;
