declare type ThingsItem =
  & Field<
    | "title"
    | "notes"
    | "list"
  >
  & {
    when:
      | ""
      | "today"
      | "someday"
    ;
  }
;
