declare type StringLength<L extends number> = LengthValue<L> extends never
  ? never
  : { length: LengthValue<L> };
