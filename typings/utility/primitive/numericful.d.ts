declare type Numericful<N extends number> = 0 extends Numeric<N>
  ? never
  : Numeric<N>;
