declare namespace Primitive {
  export type T0 = Primitive<"fast", string>;
  export type T0a = Primitive<"", string>;
  export type T0b = Primitive<"fast" | "good", string>;
  export type T0c = Primitive<"fast" | "", string>;
  export type T1 = Primitive<5, number>;
  export type T1a = Primitive<0, number>;
  export type T2 = Primitive<true, boolean>;
  export type T2a = Primitive<false, boolean>;
  export type N0 = Primitive<string, string>;
  export type N0a = Primitive<number, number>;
  export type N0b = Primitive<boolean, boolean>;
  export type N1 = Primitive<stringful, string>;
  export type N1b = Primitive<numberful, number>;

  // export type N2 = Primeval<number | 5, number>;
  // export type N2a = Primeval<string | "good", string>;
  // export type N2b = Primeval<boolean | true, boolean>;
  // export type N3 = Primeval<5, number | object>;
  // export type N3a = Primeval<symbol, symbol>;
  // export type N3b = Primeval<object, object>;
  // export type N3c = Primeval<[], readonly unknown[]>;
  // export type N3d = Primeval<()=> 5, Function>;
  // export type N3e = Primeval<5, unknown>;
  // export type N3f = Primeval<true | 10, boolean>;
  // export type N3g = Primeval<string | "good", string>;
}
