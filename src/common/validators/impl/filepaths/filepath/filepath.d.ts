declare type filepath<
  Root extends boolean = false,
> = Joined<
  stringful
  ,
  Root extends true
    ? Arrayful<
      ToString<
        FileNode
      >
    >
    : Array<
      ToString<
        FileNode
      >
    >
>;

declare type rootpath = filepath<
  true
>;

declare type subpath = filepath;
