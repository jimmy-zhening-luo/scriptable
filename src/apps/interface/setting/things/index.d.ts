declare interface ThingsSetting {
  delims: Field<
    | "TAG"
    | "ITEM"
    | "LINE"
  >;
  lists: FieldTable;
}
