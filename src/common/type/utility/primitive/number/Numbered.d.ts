declare type Numbered<N extends number> = Primeval<N, number>;

declare namespace Numbered {
  export type T0 = Numbered<0>;
  export type T1 = Numbered<0.0>;
  export type T2 = Numbered<1>;
  export type T3 = Numbered<1.0>;
  export type T4 = Numbered<1.1>;
  export type T5 = Numbered<1 | 5>;
}

declare namespace NumberedNever {
  export type N0 = Numbered<number>;
  export type N0b = Numbered<numberful>;
  export type N0c = Numbered<number | numberful>;
  export type N0d = Numbered<1 | numberful>;
  export type N1 = Numbered<never>;

//   export type N0e = Numbered<1 | number>;
//   export type N2 = Numbered<"cool">;
//   export type N3 = Numbered<"NaN">;
//   export type N4 = Numbered<"5">;
//   export type N5 = Numbered<string>;
//   export type N6 = Numbered<boolean>;
//   export type N6a = Numbered<true>;
//   export type N6b = Numbered<false>;
//   export type N7 = Numbered<null>;
//   export type N8 = Numbered<undefined>;
//   export type N9 = Numbered<void>;
//   export type N10 = Numbered<{}>;
//   export type N11 = Numbered<[]>;
//   export type N12 = Numbered<5 | true>;
//   export type N13 = Numbered<()=> 5>;
//   export type N14 = Numbered<symbol>;
}
