declare const fileroot: unique symbol;

type FStringBrand<B> = { [fileroot]: B };

declare type filepath<Root extends boolean = false> = FStringBrand<Root> & Root extends true
  ? stringful
  : string;

declare type rootpath = filepath<true>;

declare type subpath = filepath;
