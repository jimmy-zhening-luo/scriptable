declare namespace literal {
  export type Result = 0 | Test<{
    T: {
      T: literal<"">;
      T0: literal<"a">;
      T1: literal<"a" | "b">;
      T1b: literal<"a" | "">;
    };
    F: {
      N: literal<never>;
      N0: literal<string>;
      // Error
      // N1: literal<unknown>;
      // N2: literal<null>;
      // N3: literal<undefined>;
      // N4: literal<void>;
      // N5: literal<object>;
      // N6: literal<()=> "a">;
      // N7: literal<symbol>;
      // N8: literal<"a" | 5>;
    };
  }>;
}
