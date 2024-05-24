declare type FilelinkSetting = {
  user: {
    folder: Table<
      FileProvider
    >;
  };
};

declare type FileProvider<
  C extends boolean,
> =
  boolean extends C
    ? never
    :
      & Field<
        "providerRoot"
      >
      & C extends false
        ?
          & Record<
            "hasContainers"
            ,
            false
          >
        :
          & Record<
            "hasContainers"
            ,
            true
          >
          & Field<
            | "folderRoot"
            | "preAppRoot"
          >
          & FileContainerManifest
;

declare type FileContainerManifest = {
  containers: {
    folders: string[];
    apps: FieldTable;
  }
};
