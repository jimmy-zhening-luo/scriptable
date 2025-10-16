declare namespace literalful {
  export type Result = 0 | Test<{
    T: [
      Literalful<"foo">,
      Literalful<"foo" | "bar">,
    ];
    F: [
      Literalful<"">,
      Literalful<"" | "foo">,
      Literalful<string>,
      Literalful<stringful>,
      Literalful<char>,
      Literalful<stringful | "">,
      Literalful<stringful | "foo">,
      Literalful<stringful | "" | "foo">,
      Literalful<stringful | "foo" | "bar">,
      Literalful<char | "">,
      Literalful<stringful | string>,
      Literalful<char | string>,
      Literalful<stringful | char>,
      Literalful<stringful | char | "">,
      Literalful<stringful | char | "foo">,
      Literalful<stringful | char | "" | "foo">,
      Literalful<stringful | char | "foo" | "bar">,
      Literalful<never>,
      // Error:
      // literalful<unknown>,
      // literalful<null>,
      // literalful<undefined>,
      // literalful<void>,
      // literalful<object>,
      // literalful<()=> "a">,
      // literalful<symbol>,
      // literalful<"a" | 1>,
    ];
  }>;
}
