declare type FileContainerManifest = Record<
  "containers",
  & List<"folders">
  & Record<"apps", FieldTable>
>;
