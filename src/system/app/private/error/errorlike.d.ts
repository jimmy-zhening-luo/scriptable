declare type ErrorLike<
  E extends boolean = false,
> = E extends true
  ? Error
  :
    | string[]
    | Error
    | PartialRecord<
      "cause"
      ,
      Error
    >
;
