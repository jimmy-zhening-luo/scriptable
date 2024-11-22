declare namespace literal {
  export type Result = 0 | Test<{
    T: {
      a: literal<"">;
      a0: literal<"foo">;
      a1: literal<"" | "foo">;
      a2: literal<"foo" | "bar">;
    };
    F: {
      a: literal<string>;
      a0: literal<stringful>;
      a1: literal<char>;
      a2: literal<stringfully<"baz">>;
      b: literal<stringful | "">;
      b0: literal<stringful | "foo">;
      b1: literal<stringful | "" | "foo">;
      b2: literal<stringful | "foo" | "bar">;
      b3: literal<char | "">;
      b4: literal<stringfully<"baz"> | "">;
      x: literal<stringful | string>;
      x0: literal<char | string>;
      x1: literal<stringfully<"baz"> | string>;
      x2: literal<stringful | char>;
      x3: literal<stringful | stringfully<"baz">>;
      x4: literal<char | stringfully<"baz">>;
      x5: literal<stringful | char | stringfully<"baz">>;
      x6: literal<stringful | char | stringfully<"baz"> | "">;
      x7: literal<stringful | char | stringfully<"baz"> | "foo">;
      x8: literal<stringful | char | stringfully<"baz"> | "" | "foo">;
      x9: literal<stringful | char | stringfully<"baz"> | "foo" | "bar">;
      y: literal<never>;
      // Error
      // z1: literal<unknown>;
      // z2: literal<null>;
      // z3: literal<undefined>;
      // z4: literal<void>;
      // z5: literal<object>;
      // z6: literal<()=> "a">;
      // z7: literal<symbol>;
      // z8: literal<"a" | 1>;
    };
  }>;
}
