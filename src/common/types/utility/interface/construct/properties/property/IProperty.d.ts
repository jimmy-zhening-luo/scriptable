declare type IProperty<
  V,
  K extends string,
  Optional extends
  | K
  | boolean
  ,
> = string extends K
  ? never
  : Unrequire<
    Record<
      K
      ,
      V
    >
    ,
    Optional
  >
;
