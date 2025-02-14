declare namespace Tuple {
  export type Bound<
    Case extends number,
    Reference,
  > = Tuple<Case> extends Readonly<Reference>
    ? Reference extends Tuple<Case>
      ? string[] extends Tuple<Case>
        ? Tuple<Case> extends readonly string[]
          ? Tuple<Case>
          : never
        : Tuple<Case>
      : never
    : never;
  export type Result = 0 | Test<{
    T: [
    // number: readonly string[]:
      Tuple<number> extends readonly string[]
        ? string[] extends Tuple<number>
          ? Tuple<number>
          : never
        : never,
      Bound<number, string[]>,
      Bound<number, readonly string[]>,
      Bound<number, Tuple<number>>,
      Bound<typeof NaN, Tuple<number>>,
      Bound<typeof Infinity, Tuple<number>>,

      // 0: readonly []:
      Tuple<0> extends readonly []
        ? [] extends Tuple<0>
            ? string[] extends Tuple<0>
              ? never
              : Tuple<0>
            : never
        : never,
      Bound<0, []>,
      Bound<0, Tuple<0>>,
      Bound<-0, Tuple<0>>,
      Bound<-1, Tuple<0>>,
      Bound<-1.00000, Tuple<0>>,
      Bound<-2, Tuple<0>>,
      Bound<-2.0, Tuple<0>>,
      Bound<-2.1, Tuple<0>>,
      Bound<9.999999999, Tuple<0>>,
      Bound<-1.1 | 3.4, Tuple<0>>,
      Bound<-1.1 | -3.4, Tuple<0>>,
      Bound<-1 | 3.4, Tuple<0>>,
      Bound<-1 | -3.4, Tuple<0>>,

      // 1: readonly [string]:
      Tuple<1> extends readonly [string]
        ? [string] extends Tuple<1>
            ? string[] extends Tuple<1>
              ? never
              : Tuple<1>
            : never
        : never,
      Bound<1, [string]>,
      Bound<1, readonly [string]>,
      Bound<1, Tuple<1>>,
      Bound<1.0, Tuple<1>>,

      // 2: readonly [string, string]:
      Bound<2, [string, string]>,
      Bound<2, readonly [string, string]>,
      Bound<2, Tuple>,

      // Combinations:
      Bound<0 | 1, [] | [string]>,
      Bound<0 | 1, readonly [] | readonly [string]>,
      Bound<0 | 1, Tuple<0> | Tuple<1>>,
      Bound<2 | 3, Tuple | Tuple<3>>,
      Bound<2 | -1, Tuple | Tuple<0>>,
      Bound<2 | 1.1, Tuple | Tuple<0>>,
      Bound<2 | -1.1, Tuple | Tuple<0>>,
      Bound<2 | -1.00000, Tuple | Tuple<0>>,
      Bound<2 | 9.999999999, Tuple | Tuple<0>>,

      // Types:
      Tuple<2, unknown> extends readonly [unknown, unknown]
        ? [unknown, unknown] extends Tuple<2, unknown>
            ? Tuple<2, unknown>
            : never
        : never,
      Tuple<2, string | number> extends readonly [string | number, string | number]
        ? [string | number, string | number] extends Tuple<2, string | number>
            ? Tuple<2, string | number>
            : never
        : never,

    // Error:
    // Bound<-2.1 | number, Tuple<number>>,
    // Bound<-2.0 | number, Tuple<number>>,
    // Bound<-2 | number, Tuple<number>>,
    // Bound<-1 | number, Tuple<number>>,
    // Bound<0 | number, Tuple<number>>,
    // Bound<1 | number, Tuple<number>>,
    // Bound<2 | number, Tuple<number>>,
    // Bound<2.0 | number, Tuple<number>>,
    // Bound<2.1 | number, Tuple<number>>,
    // Bound<2.1 | number, Tuple<number>>,
    // Tuple<1, unknown | 0> extends readonly [unknown] ? [unknown] extends Tuple<1, unknown | 0> ? Tuple<1, unknown | 0> : never : never,
    ];
    F: [
      Tuple<never>,
      Tuple<never, never>,
      Tuple<number, never>,
      Tuple<2.1, never>,
      Tuple<2.0, never>,
      Tuple<2, never>,
      Tuple<1, never>,
      Tuple<0, never>,
      Tuple<-1, never>,
      Tuple<-2, never>,
      Tuple<-2.0, never>,
      Tuple<-2.1, never>,
    ];
  }>;
}
