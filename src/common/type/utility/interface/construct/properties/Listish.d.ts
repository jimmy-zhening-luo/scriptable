declare type Listish<
  K extends string,
  Optional = false,
> = IProperty<Unflat<string>, K, Optional>;
