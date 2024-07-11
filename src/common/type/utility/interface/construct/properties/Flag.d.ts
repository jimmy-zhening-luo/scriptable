declare type Flag<
  K extends string,
  Optional = true,
> = IProperty<boolean, K, Optional>;
