declare type FileProvider<
  C extends boolean,
> =
  & Field<
    "providerRoot"
  >
  & (
    C extends false
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
        & FileContainerManifest
        & Field<
          | "folderRoot"
          | "preAppRoot"
          ,
          "preAppRoot"
        >
  )
;
