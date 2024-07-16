declare type TrueTupleType<T extends readonly unknown[]> = 1 extends ArrayLength<T>
  ? never
  : TuplefulType<T>;
