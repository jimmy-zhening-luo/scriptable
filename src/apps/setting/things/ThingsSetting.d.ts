declare type ThingsSetting = {
  app: {
    tag: string;
    delims: Field<
      | "item"
      | "line"
    >;
  };
  user: {
    triage: string;
    lists: FieldTable;
  };
};
