declare type IProperty<
  Value,
  Key extends string,
  OptionalKey,
> = string extends Key
  ? never
  : OptionalKey extends
  | Key
  | boolean
    ? Unrequire<
      Record<
        Key
        ,
        Value
      >
      ,
      OptionalKey
    >
    : never;
