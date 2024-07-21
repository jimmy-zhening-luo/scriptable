declare interface LinkSetting {
  host: {
    www: readonly string[];
    swap: FieldTable;
  };
  query: {
    omit: readonly string[];
    include: ListTable;
    exclude: ListTable;
  };
  fragment: {
    trim: readonly string[];
  };
}
