declare interface FileContainerManifest {
  containers: {
    folders: readonly string[];
    apps: FieldTable;
  };
}
