declare type ErrorLike =
  | Error
  | Unflat<primitive>
  | { cause?: Null<ErrorLike> }
;
