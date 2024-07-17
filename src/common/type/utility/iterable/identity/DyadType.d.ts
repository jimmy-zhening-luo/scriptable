declare type DyadType<A extends readonly unknown[]> = 1 extends ArrayLength<A>
  ? never
  : MonadType<A>;
