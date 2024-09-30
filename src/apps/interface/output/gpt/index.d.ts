declare interface GptOutput {
  api: string;
  header: Field<"auth" | "org">;
  body:
    & { messages: readonly GptMessage[] }
    & Field<
      | "model"
      ,
      | "temperature"
      | "top_p"
    >;
}
