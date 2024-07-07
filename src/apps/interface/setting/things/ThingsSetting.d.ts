declare type ThingsSetting = {
  tag: string;
  delim: Field<
    | "item"
    | "line"
  >;
  lists: FieldTable;
};
