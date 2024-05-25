declare type Listish<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProperty<
  Unflat<
    string
  >
  ,
  K
  ,
  Optional
>;
