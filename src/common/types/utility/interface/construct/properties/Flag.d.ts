declare type Flag<
  Key extends string,
  OptionalKey = true,
> = IProperty<
  boolean
  ,
  Key
  ,
  OptionalKey
>;
