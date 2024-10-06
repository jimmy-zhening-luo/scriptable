declare type ErrorLike =
  | Error
  | { cause?: ErrorLike }
  | Unflat<primitive>
;
