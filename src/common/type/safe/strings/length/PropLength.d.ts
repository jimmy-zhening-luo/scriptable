declare type PropLength<L extends number> = Length<L> extends never
  ? never
  : { length: Length<L> };
