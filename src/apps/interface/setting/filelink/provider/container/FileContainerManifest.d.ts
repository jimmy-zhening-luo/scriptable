declare type FileContainerManifest = {
  containers:
    & List<"folders">
    & Record<"apps", FieldTable>;
};
