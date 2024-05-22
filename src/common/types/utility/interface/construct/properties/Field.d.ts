declare type Field<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProperty<
  string
  ,
  K
  ,
  Optional
>;
