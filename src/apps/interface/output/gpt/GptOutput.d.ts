declare type GptOutput =
  & Field<"api">
  & Record<
    "header",
    Field<
      | "auth"
      | "org"
    >
  >
  & Record<
    "body",
    & Field<
      | "model"
      | "max_tokens"
      | "temperature"
      | "top_p"
    >
    & Record<"messages", GptMessage[]>
  >
;
