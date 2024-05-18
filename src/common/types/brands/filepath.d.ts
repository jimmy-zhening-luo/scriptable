declare const fileroot: unique symbol;

type FilepathLevel<B> = { [fileroot]: B };

declare type filepath<Root extends boolean = false> = FilepathLevel<Root> & Root extends true
  ? stringful
  : string;

declare type rootpath = Joint<
  filepath<true>,
  Part,
  true
>;

declare type subpath = Joint<
  filepath,
  Part,
  false
>;
