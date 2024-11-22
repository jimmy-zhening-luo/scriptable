declare namespace literalful {
  export type Result = 0 | Test<{
    T: {
      T0: literalful<"a">;
      T1: literalful<"a" | "b">;
    };
    F: {
      N0: literalful<never>;
      N1: literalful<"">;
      N2: literalful<string>;
      N2b: literalful<stringful>;
      N3: literalful<"" | "a">;
      // Error
      // N5: literalful<"a" | string>;
      // N5a: literalful<unknown>;
      // N5b: literalful<null>;
      // N5c: literalful<undefined>;
      // N5d: literalful<void>;
      // N5e: literalful<[]>;
      // N5f: literalful<object>;
      // N5g: literalful<()=> "a">;
      // N5h: literalful<symbol>;
      // N5i: literalful<"a" | 1>;
    };
  }>;
}
