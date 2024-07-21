declare type FileProvider<HasContainers> =
  & Field<"providerRoot">
  & (
    HasContainers extends false
      ? Recordful<"hasContainers", false>
      :
        & Recordful<"hasContainers", true>
        & Field<
          | "postContainerRoot"
          | "folderRoot"
          ,
          "preAppRoot"
        >
        & FileContainerManifest
      )
;
