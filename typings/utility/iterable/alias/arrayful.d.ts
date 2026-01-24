declare type Arrayful<
  T = string,
  Readonly extends boolean = false,
> = ArrayN<
  1,
  T,
  Readonly
>;
