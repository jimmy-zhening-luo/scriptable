declare type Flag<
  K extends string,
  Optional extends
  | K
  | boolean = true
  ,
> = IProp<
  boolean
  ,
  K
  ,
  Optional
>;
