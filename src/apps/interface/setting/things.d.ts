declare interface ThingsSetting {
  delims: Field<"TAG" | "ITEM" | "LINE">;
  lists: Table<Field<"id">>;
}
