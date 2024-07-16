declare type MinLength<N extends number> = [number] extends [N]
  ? 0
  : N;

declare namespace Length {
  export type T0 = MinLength<0>;
  export type T0a = MinLength<number>; // 0
  export type T1 = MinLength<0.0>;
  export type T2 = MinLength<1>;
  export type T3 = MinLength<1.0>;
  export type T4 = MinLength<1.1>;
  export type T5 = MinLength<1 | 5>; // 1 | 5
  export type T6 = MinLength<0 | 1 | 5>; // 0 | 1 | 5
}
