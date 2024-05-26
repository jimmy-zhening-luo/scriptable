declare type filepath<
  Root extends boolean = false,
> = Joined<
  stringful
  ,
  Root extends true
    ? Arrayful<filenode>
    : filenode[]
>;

declare type rootpath = filepath<
  true
>;

declare type subpath = filepath;
