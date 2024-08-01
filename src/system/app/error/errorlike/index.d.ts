declare type ErrorLike<Real extends boolean = false> = True<Real> extends never
  ?
  | Error
  | { cause?: ErrorLike }
  | Unflat<primitive>
  : Error;
