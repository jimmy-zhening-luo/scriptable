declare type filepath<
  Root extends boolean = false,
> = Joint<
  stringful
  ,
  filenode
  ,
  Root
>;

declare type rootpath = filepath<
  true
>;

declare type subpath = filepath;
