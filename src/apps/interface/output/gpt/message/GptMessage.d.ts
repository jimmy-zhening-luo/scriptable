declare type GptMessage =
  & Recordful<"role", GptRole>
  & Field<"content">
;
