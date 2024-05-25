declare type GptMessages<
  S extends boolean = false,
> = S extends true
  ? [
      GptMessage<
        "system"
      >,
      GptMessage<
        "user"
      >,
    ]
  : Monad<
    GptMessage<
      "user"
    >
  >;

declare type GptMessage<
  Role extends
  | "system"
  | "user"
  ,
> =
  & Record<
    "role"
    ,
    Role
  >
  & Field<
    "content"
  >
;
