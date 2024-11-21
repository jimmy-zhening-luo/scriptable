declare namespace LiteralPrimitive {
  export type Result = 0 | Test<{
    T: {
      T0: LiteralPrimitive<"fast", string>;
      T0a: LiteralPrimitive<"", string>;
      T0b: LiteralPrimitive<"fast" | "good", string>;
      T0c: LiteralPrimitive<"fast" | "", string>;
      T1: LiteralPrimitive<5, number>;
      T1a: LiteralPrimitive<0, number>;
      T2: LiteralPrimitive<true, boolean>;
      T2a: LiteralPrimitive<false, boolean>;
    };
    F: {
      N0: LiteralPrimitive<string, string>;
      N0a: LiteralPrimitive<number, number>;
      N0b: LiteralPrimitive<boolean, boolean>;
      N1: LiteralPrimitive<stringful, string>;
      N1b: LiteralPrimitive<numberful, number>;
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
