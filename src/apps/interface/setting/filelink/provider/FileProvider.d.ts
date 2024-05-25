declare type FileProvider<
  C extends boolean,
> =
  & C extends false
    ?
    & Field<
      "providerRoot"
    >
    & Record<
      "hasContainers"
      ,
      false
    >
    :
      & Field<
        "providerRoot"
      >
      & Record<
        "hasContainers"
        ,
        true
      >
      & Field<
        | "folderRoot"
        | "preAppRoot"
        ,
        "preAppRoot"
      >
      & FileContainerManifest
;
