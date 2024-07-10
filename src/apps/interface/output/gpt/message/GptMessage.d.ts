declare type GptMessage =
  & Record<"role", GptRole>
  & Field<"content">
;
