declare type LengthValue<N extends number> = [N] extends [number]
  ? [number] extends [N]
      ? 0
      : Numbered<N>
  : never;

declare namespace Length {
  export type T0 = LengthValue<0>;
  export type T0a = LengthValue<0.0>; // 0
  export type T0b = LengthValue<number>; // 0
  export type T1 = LengthValue<1>;
  export type T1a = LengthValue<1.0>; // 1
  export type T2 = LengthValue<1.1>; // 1.1
  export type T3 = LengthValue<1 | 5>; // 1 | 5
  export type T3b = LengthValue<0 | 1 | 5>; // 0 | 1 | 5
}

declare namespace NotLength {
  export type N = LengthValue<never>;

  // export type N0 = Length<unknown>;
  // export type N0a = Length<undefined>;
  // export type N0b = Length<null>;
  // export type N0c = Length<void>;
  // export type N0d = Length<undefined>;
  // export type N0e = Length<undefined>;
  // export type N1 = Length<"1">;
  // export type N1a = Length<true>;
  // export type N1b = Length<[5, 5]>;
  // export type N1c = Length<()=> void>;
  // export type N1d = Length<object>;
  // export type N2 = Length<null | 1>;
  // export type N2a = Length<true | 1>;
  // export type N2b = Length<number | 1>; // 0
}
