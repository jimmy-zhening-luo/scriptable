declare type TriadType<T extends readonly unknown[]> = 2 extends ArrayLength<T>
  ? never
  : TrueTupleType<T>;
