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
