declare namespace literalful {
  export type Result = 0 | Test<{
    T: [
      literalful<"foo">,
      literalful<"foo" | "bar">,
    ];
    F: [
      literalful<"">,
      literalful<"" | "foo">,
      literalful<string>,
      literalful<stringful>,
      literalful<char>,
      literalful<stringfully<"baz">>,
      literalful<stringful | "">,
      literalful<stringful | "foo">,
      literalful<stringful | "" | "foo">,
      literalful<stringful | "foo" | "bar">,
      literalful<char | "">,
      literalful<stringfully<"baz"> | "">,
      literalful<stringful | string>,
      literalful<char | string>,
      literalful<stringfully<"baz"> | string>,
      literalful<stringful | char>,
      literalful<stringful | stringfully<"baz">>,
      literalful<char | stringfully<"baz">>,
      literalful<stringful | char | stringfully<"baz">>,
      literalful<stringful | char | stringfully<"baz"> | "">,
      literalful<stringful | char | stringfully<"baz"> | "foo">,
      literalful<stringful | char | stringfully<"baz"> | "" | "foo">,
      literalful<stringful | char | stringfully<"baz"> | "foo" | "bar">,
      literalful<never>,
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
