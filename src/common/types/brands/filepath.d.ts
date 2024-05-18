declare const fileroot: unique symbol;

type FilepathLevel<B> = { [fileroot]: B };

declare type filepath<Root extends boolean = false> = FilepathLevel<Root> & Root extends true
  ? stringful
  : string;

declare type rootpath = filepath<true>;

declare type subpath = filepath;
