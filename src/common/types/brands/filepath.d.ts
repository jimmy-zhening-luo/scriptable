declare const fileroot: unique symbol;

type FStringBrand<B> = { [fileroot]: B };

declare type filestring<Root extends boolean = false> = FStringBrand<Root> & Root extends true
  ? stringful
  : string;

declare type rootpath = filestring<true>;

declare type subpath = filestring;
