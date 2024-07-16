declare type Length<N extends number> = [number] extends [N]
  ? 0
  : N;

declare namespace Length {
  export type T0 = Length<0>;
  export type T0a = Length<number>; // 0
  export type T1 = Length<0.0>;
  export type T2 = Length<1>;
  export type T3 = Length<1.0>;
  export type T4 = Length<1.1>;
  export type T5 = Length<1 | 5>; // 1 | 5
  export type T6 = Length<0 | 1 | 5>; // 0 | 1 | 5
}
