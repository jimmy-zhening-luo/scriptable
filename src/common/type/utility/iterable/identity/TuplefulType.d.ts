declare type TuplefulType<A extends readonly unknown[]> = 0 extends ArrayLength<A>
  ? never
  : ArrayType<A>;
