declare namespace literal {
  export type Result = 0 | Test<{
    T: [
      literal<"">,
      literal<"foo">,
      literal<"" | "foo">,
      literal<"foo" | "bar">,
    ];
    F: [
      literal<string>,
      literal<stringful>,
      literal<char>,
      literal<stringfully<"baz">>,
      literal<stringful | "">,
      literal<stringful | "foo">,
      literal<stringful | "" | "foo">,
      literal<stringful | "foo" | "bar">,
      literal<char | "">,
      literal<stringfully<"baz"> | "">,
      literal<stringful | string>,
      literal<char | string>,
      literal<stringfully<"baz"> | string>,
      literal<stringful | char>,
      literal<stringful | stringfully<"baz">>,
      literal<char | stringfully<"baz">>,
      literal<stringful | char | stringfully<"baz">>,
      literal<stringful | char | stringfully<"baz"> | "">,
      literal<stringful | char | stringfully<"baz"> | "foo">,
      literal<stringful | char | stringfully<"baz"> | "" | "foo">,
      literal<stringful | char | stringfully<"baz"> | "foo" | "bar">,
      literal<never>,
      // Error:
      // literal<unknown>,
      // literal<null>,
      // literal<undefined>,
      // literal<void>,
      // literal<object>,
      // literal<()=> "a">,
      // literal<symbol>,
      // literal<"a" | 1>,
    ];
  }>;
}
