declare type FileContainerManifest = Recordful<
  "containers",
  {
    folders: readonly string[];
    apps: FieldTable;
  }
>;
