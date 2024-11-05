declare namespace Numeric {
  export type T0 = Numeric<0>;
  export type T1 = Numeric<0.0>;
  export type T2 = Numeric<1>;
  export type T3 = Numeric<1.0>;
  export type T4 = Numeric<1.1>;
  export type T5 = Numeric<1 | 5>;
  export type N0 = Numeric<number>;
  export type N0b = Numeric<numberful>;
  export type N0c = Numeric<number | numberful>;
  export type N0d = Numeric<1 | numberful>;
  export type N1 = Numeric<never>;

  // export type N0e = Numbered<1 | number>;
  // export type N2 = Numbered<"cool">;
  // export type N3 = Numbered<"NaN">;
  // export type N4 = Numbered<"5">;
  // export type N5 = Numbered<string>;
  // export type N6 = Numbered<boolean>;
  // export type N6a = Numbered<true>;
  // export type N6b = Numbered<false>;
  // export type N7 = Numbered<null>;
  // export type N8 = Numbered<undefined>;
  // export type N9 = Numbered<void>;
  // export type N10 = Numbered<object>;
  // export type N11 = Numbered<[]>;
  // export type N12 = Numbered<5 | true>;
  // export type N13 = Numbered<() => 5>;
  // export type N14 = Numbered<symbol>;
}
