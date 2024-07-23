declare interface ThingsSetting {
  delim: Field<
    | "TAG"
    | "ITEM"
    | "LINE"
  >;
  list: FieldTable;
}
