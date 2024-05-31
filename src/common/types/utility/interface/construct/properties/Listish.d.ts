declare type Listish<
  Key extends string,
  OptionalKey = false,
> = IProperty<
  Unflat<
    string
  >
  ,
  Key
  ,
  OptionalKey
>;
