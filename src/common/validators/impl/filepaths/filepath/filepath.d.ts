declare type filepath<
  Root extends boolean = false,
> = Joined<
  stringful
  ,
  Root extends true
    ? Arrayful<
      Strung<
        FileNode
      >
    >
    : Array<
      Strung<
        FileNode
      >
    >
>;

declare type rootpath = filepath<
  true
>;

declare type subpath = filepath;
