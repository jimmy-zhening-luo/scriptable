declare namespace NTuple {
  export type Bound<
    Case extends number,
    Reference,
  > = NTuple<Case> extends Readonly<Reference>
    ? Reference extends NTuple<Case>
      ? string[] extends NTuple<Case>
        ? NTuple<Case> extends readonly string[]
          ? NTuple<Case>
          : never
        : NTuple<Case>
      : never
    : never;
  export type Result = 0 | Test<{
    T: [
    // number: readonly string[]:
      NTuple<number> extends readonly string[]
        ? string[] extends NTuple<number>
          ? NTuple<number>
          : never
        : never,
      Bound<number, string[]>,
      Bound<number, readonly string[]>,
      Bound<number, NTuple<number>>,
      Bound<typeof NaN, NTuple<number>>,
      Bound<typeof Infinity, NTuple<number>>,

      // 0: readonly []:
      NTuple<0> extends readonly []
        ? [] extends NTuple<0>
            ? string[] extends NTuple<0>
              ? never
              : NTuple<0>
            : never
        : never,
      Bound<0, []>,
      Bound<0, NTuple<0>>,
      Bound<-0, NTuple<0>>,
      Bound<-1, NTuple<0>>,
      Bound<-1.00000, NTuple<0>>,
      Bound<-2, NTuple<0>>,
      Bound<-2.0, NTuple<0>>,
      Bound<-2.1, NTuple<0>>,
      Bound<9.999999999, NTuple<0>>,
      Bound<-1.1 | 3.4, NTuple<0>>,
      Bound<-1.1 | -3.4, NTuple<0>>,
      Bound<-1 | 3.4, NTuple<0>>,
      Bound<-1 | -3.4, NTuple<0>>,

      // 1: readonly [string]:
      NTuple<1> extends readonly [string]
        ? [string] extends NTuple<1>
            ? string[] extends NTuple<1>
              ? never
              : NTuple<1>
            : never
        : never,
      Bound<1, [string]>,
      Bound<1, readonly [string]>,
      Bound<1, NTuple<1>>,
      Bound<1.0, NTuple<1>>,

      // 2: readonly [string, string]:
      Bound<2, [string, string]>,
      Bound<2, readonly [string, string]>,
      Bound<2, NTuple>,

      // Combinations:
      Bound<0 | 1, [] | [string]>,
      Bound<0 | 1, readonly [] | readonly [string]>,
      Bound<0 | 1, NTuple<0> | NTuple<1>>,
      Bound<2 | 3, NTuple | NTuple<3>>,
      Bound<2 | -1, NTuple | NTuple<0>>,
      Bound<2 | 1.1, NTuple | NTuple<0>>,
      Bound<2 | -1.1, NTuple | NTuple<0>>,
      Bound<2 | -1.00000, NTuple | NTuple<0>>,
      Bound<2 | 9.999999999, NTuple | NTuple<0>>,

      // Types:
      NTuple<2, unknown> extends readonly [unknown, unknown]
        ? [unknown, unknown] extends NTuple<2, unknown>
            ? NTuple<2, unknown>
            : never
        : never,
      NTuple<2, string | number> extends readonly [string | number, string | number]
        ? [string | number, string | number] extends NTuple<2, string | number>
            ? NTuple<2, string | number>
            : never
        : never,

    // Error:
    // Bound<-2.1 | number, NTuple<number>>,
    // Bound<-2.0 | number, NTuple<number>>,
    // Bound<-2 | number, NTuple<number>>,
    // Bound<-1 | number, NTuple<number>>,
    // Bound<0 | number, NTuple<number>>,
    // Bound<1 | number, NTuple<number>>,
    // Bound<2 | number, NTuple<number>>,
    // Bound<2.0 | number, NTuple<number>>,
    // Bound<2.1 | number, NTuple<number>>,
    // Bound<2.1 | number, NTuple<number>>,
    // NTuple<1, unknown | 0> extends readonly [unknown] ? [unknown] extends NTuple<1, unknown | 0> ? NTuple<1, unknown | 0> : never : never,
    ];
    F: [
      NTuple<never>,
      NTuple<never, never>,
      NTuple<number, never>,
      NTuple<2.1, never>,
      NTuple<2.0, never>,
      NTuple<2, never>,
      NTuple<1, never>,
      NTuple<0, never>,
      NTuple<-1, never>,
      NTuple<-2, never>,
      NTuple<-2.0, never>,
      NTuple<-2.1, never>,
    ];
  }>;
}
