declare namespace Recordful {
  export type Result = 0 | Test<{
    T: [
      Recordful<0>,
      Recordful<0 | 1>,
      Recordful<1>,
      Recordful<1 | 2>,
      Recordful<2>,
      Recordful<0 | 1 | 2>,
      Recordful<"">,
      Recordful<"" | "foo">,
      Recordful<"foo">,
      Recordful<"foo" | "bar">,
      Recordful<"" | "foo" | "bar">,
      Recordful<0 | "">,
      Recordful<0 | "foo">,
      Recordful<1 | "">,
      Recordful<1 | "foo">,
      Recordful<0 | 1 | "" | "foo">,
      Recordful<symbol>,
      Recordful<0 | 1 | "" | "foo" | symbol>,
      Recordful<"foo", never>,
      Recordful<"foo", object>,
      Recordful<keyof { a: 5 }>,
      Recordful<keyof {
        a: 1;
        b?: 2;
      }>,
      Recordful<keyof {
        a: 1;
        b: 2;
      }>,
      Recordful<keyof ({
        a: 1;
        b: 2;
      } | {
        a: 1;
        b: 2;
        c: 2;
      })>,

      // Error:
      // Recordful<"foo", object | never>,
    ];
    F: [
      Recordful<never>,
      Recordful<keyof never>,
      Recordful<keyof null>,
      Recordful<keyof object>,
      Recordful<keyof []>,
      Recordful<keyof readonly []>,
      Recordful<keyof readonly [string, string]> /* number */,
      Recordful<string>,
      Recordful<stringful>,
      Recordful<string | stringful>,
      Recordful<string | symbol>,
      Recordful<number>,
      Recordful<numberful>,
      Recordful<number | numberful>,
      Recordful<number | symbol>,
      Recordful<string | number>,
      Recordful<string | number | symbol>,
      Recordful<string | stringful | number | numberful>,
      Recordful<string | stringful | number | numberful | symbol>,
      Recordful<0 | numberful>,
      Recordful<1 | numberful>,
      Recordful<0 | string>,
      Recordful<1 | string>,
      Recordful<0 | stringful>,
      Recordful<1 | stringful>,
      Recordful<"" | stringful>,
      Recordful<"foo" | stringful>,
      Recordful<"" | number>,
      Recordful<"foo" | number>,
      Recordful<"" | numberful>,
      Recordful<"foo" | numberful>,

      // Error:
      // Recordful<0 | number>,
      // Recordful<1 | number>,
      // Recordful<"" | string>,
      // Recordful<"foo" | string>,
      // Recordful<unknown>,
      // Recordful<undefined>,
      // Recordful<null>,
      // Recordful<void>,
      // Recordful<boolean>,
      // Recordful<true>,
      // Recordful<false>,
      // Recordful<string | { a: cool }>,
      // Recordful<"foo" | unknown>,
    ];
  }>;
}
