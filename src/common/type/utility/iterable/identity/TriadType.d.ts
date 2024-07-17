declare type TriadType<A extends readonly unknown[]> = 2 extends ArrayLength<A>
  ? never
  : DyadType<A>;
