declare type Field<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProp<
  string
  ,
  K
  ,
  Optional
>;
