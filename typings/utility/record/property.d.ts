declare type Property<
  Key extends
  | string
  | number
  | symbol,
  Optional extends
  | string
  | number
  | symbol,
  Value,
>
= & Record<
  Key,
  Value
>
& PartialRecord<
  Optional,
  Value
>;
