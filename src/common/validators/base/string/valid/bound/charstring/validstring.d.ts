declare type validstring<
  T extends string,
  Validator extends string,
> = Valid<
  T
  ,
  Validator
>;
