declare type GptOutput =
  & Field<
    "api"
  >
  & Record<
    "header"
    ,
    Field<
      | "auth"
      | "org"
    >
  >
  & {
    body:
      & Record<
        "messages"
        ,
        GptMessages<
          boolean
        >
      >
      & Field<
        "model"
      >
      & Scalar<
        | "token"
        | "temperature"
        | "p"
      >;
  }
;
