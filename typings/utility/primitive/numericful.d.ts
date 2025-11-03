declare type Numericful<Number extends number> = 0 extends Numeric<Number>
  ? never
  : Numeric<Number>;
