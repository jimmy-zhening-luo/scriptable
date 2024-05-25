declare type FilelinkSetting = {
  user: Record<
    "providers"
    ,
    Table<
      | FileProvider
      | FileProvider<true>
    >
  >;
};

declare type FileProvider<
  C extends boolean = false,
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
  };
};
