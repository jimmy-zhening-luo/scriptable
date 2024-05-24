declare type GptPromptful =
  & Field<
    | "system"
    | "user"
  >
  & PartialRecord<
    "plugin"
    ,
    FieldTable
  >
;
