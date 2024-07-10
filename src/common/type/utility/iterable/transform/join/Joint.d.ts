declare const separator: unique symbol;
declare type Joint<
  Strings,
  Separator extends string = string,
> = Strings extends Strings
  ? Join<Strings, Separator> & { [separator]: Separator }
  : never;
