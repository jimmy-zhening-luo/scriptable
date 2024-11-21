declare namespace Primitive {
  export type Result = 0 | Test<{
    T: {
      T0: Primitive<"fast", string>;
      T0a: Primitive<"", string>;
      T0b: Primitive<"fast" | "good", string>;
      T0c: Primitive<"fast" | "", string>;
      T1: Primitive<5, number>;
      T1a: Primitive<0, number>;
      T2: Primitive<true, boolean>;
      T2a: Primitive<false, boolean>;
    };
    F: {
      N0: Primitive<string, string>;
      N0a: Primitive<number, number>;
      N0b: Primitive<boolean, boolean>;
      N1: Primitive<stringful, string>;
      N1b: Primitive<numberful, number>;
      // Error:
      // N2: Primeval<number | 5, number>;
      // N2a: Primeval<string | "good", string>;
      // N2b: Primeval<boolean | true, boolean>;
      // N3: Primeval<5, number | object>;
      // N3a: Primeval<symbol, symbol>;
      // N3b: Primeval<object, object>;
      // N3c: Primeval<[], readonly unknown[]>;
      // N3d: Primeval<()=> 5, Function>;
      // N3e: Primeval<5, unknown>;
      // N3f: Primeval<true | 10, boolean>;
      // N3g: Primeval<string | "good", string>;
    };
  }>;
}
