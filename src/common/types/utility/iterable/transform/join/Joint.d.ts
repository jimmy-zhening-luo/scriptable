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

declare type UJoin = Joint<ArrayMin<stringful, 0> | ArrayMin<stringful, 1>, "/">;
