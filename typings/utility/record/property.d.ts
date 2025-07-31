declare type Property<
  Key extends
  | string
  | number
  | symbol,
  OptionalKey extends string,
  Value,
>
  = & Record<
    Key,
    Value
  >
  & PartialRecord<
    OptionalKey,
    Value
  >
    ;
