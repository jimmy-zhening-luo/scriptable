declare interface GptOutput {
  api: string;
  header: Field<"auth" | "org">;
  body:
    & { messages: readonly GptMessage[] }
    & Field<
      | "model"
      ,
      | "max_tokens"
      | "temperature"
      | "top_p"
    >;
}
