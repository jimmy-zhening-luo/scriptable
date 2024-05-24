declare type List<
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
