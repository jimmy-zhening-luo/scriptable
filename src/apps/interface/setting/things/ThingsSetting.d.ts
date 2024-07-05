declare type ThingsSetting = {
  app: {
    tag: string;
    delim: Field<
      | "item"
      | "line"
    >;
  };
  user: {
    lists: FieldTable;
  };
};
