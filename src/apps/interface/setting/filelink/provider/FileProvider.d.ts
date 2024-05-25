declare type FileProvider<
  C extends boolean,
> =
  & C extends false
    ?
    & Record<
      "hasContainers"
      ,
      false
    >
    & Field<
      "providerRoot"
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
      & Field<
        "providerRoot"
      >
;
