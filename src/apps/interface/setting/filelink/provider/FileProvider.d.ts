declare type FileProvider<C extends boolean> =
  & Field<"providerRoot">
  & (
    C extends false
      ? Recordful<"hasContainers", false>
      :
        & Recordful<"hasContainers", true>
        & FileContainerManifest
        & Field<
          | "postContainerRoot"
          | "folderRoot"
          ,
          "preAppRoot"
        >
  )
;
