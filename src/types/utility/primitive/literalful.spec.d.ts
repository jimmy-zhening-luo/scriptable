declare namespace literalful {
  export type Result = 0 | Test<{
    T: [
      literalful<"a">,
      literalful<"a" | "b">,
    ];
    F: [
      literalful<never>,
      literalful<"">,
      literalful<string>,
      literalful<stringful>,
      literalful<"" | "a">,
      // Error
      // literalful<"a" | string>,
      // literalful<unknown>,
      // literalful<null>,
      // literalful<undefined>,
      // literalful<void>,
      // literalful<[]>,
      // literalful<object>,
      // literalful<()=> "a">,
      // literalful<symbol>,
      // literalful<"a" | 1>,
    ];
  }>;
}
