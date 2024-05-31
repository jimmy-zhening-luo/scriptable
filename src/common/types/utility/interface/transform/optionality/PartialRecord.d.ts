declare type PartialRecord<
  Key extends
  | string
  | number
  | symbol
  ,
  Value
  ,
> = Partial<
  Record<
    Key
    ,
    Value
  >
>;
