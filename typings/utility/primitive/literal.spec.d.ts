declare namespace literal {
  export type Result = 0 | Test<{
    T: [
      Literal<"">,
      Literal<"foo">,
      Literal<"" | "foo">,
      Literal<"foo" | "bar">,
    ];
    F: [
      Literal<string>,
      Literal<stringful>,
      Literal<char>,
      Literal<stringful | "">,
      Literal<stringful | "foo">,
      Literal<stringful | "" | "foo">,
      Literal<stringful | "foo" | "bar">,
      Literal<char | "">,
      Literal<stringful | string>,
      Literal<char | string>,
      Literal<stringful | char>,
      Literal<stringful | char | "">,
      Literal<stringful | char | "foo">,
      Literal<stringful | char | "" | "foo">,
      Literal<stringful | char | "foo" | "bar">,
      Literal<never>,
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
