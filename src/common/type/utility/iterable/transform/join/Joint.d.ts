declare const separator: unique symbol;
declare type Joint<
  A,
  Separator extends string = string,
> = A extends A
  ?
  & Join<
    A
    ,
    Separator
  >
  & { [separator]: Separator }
  : never;
