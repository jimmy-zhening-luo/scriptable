declare type Arrayful<
  Member = string,
  Readonly extends boolean = false,
> = ArrayN<1, Member, Readonly>;
