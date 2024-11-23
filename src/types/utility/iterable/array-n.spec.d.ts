declare namespace ArrayN {
  export type Bound<
    Case extends number,
    Max extends number = 0,
  > = ArrayN<Case> extends ArrayN<Max>
    ? ArrayN<Max> extends ArrayN<Case>
      ? ArrayN<Case> extends [string, ...ArrayN<Max>]
        ? never
        : ArrayN<Case>
      : never
    : never;
  export type Result = 0 | Test<{
    T: [
      ArrayN<3> extends [string, string, string, ...string[]]
        ? ArrayN<3> extends [string, string, string, string, ...string[]]
          ? never
          : true
        : never,
      ArrayN<2> extends [string, string, ...string[]] ? ArrayN<2> extends ArrayN<3> ? never : true : never,
      ArrayN<1> extends [string, ...string[]] ? ArrayN<1> extends ArrayN<2> ? never : true : never,
      Bound<1.0, 1>,
      Bound<0>,
      Bound<-0>,
      Bound<-1>,
      Bound<-1.00000>,
      Bound<-2>,
      Bound<-2.0>,
      Bound<-2.1>,
      Bound<typeof NaN>,
      Bound<number>,
      Bound<typeof Infinity>,
      Bound<9.999999999>,
      Bound<0 | 1>,
      Bound<0 | 2>,
      Bound<0 | 1 | 2>,
      Bound<-1.1 | 3.4>,
      Bound<-1.1 | -3.4>,
      Bound<-1 | 3.4>,
      Bound<-1 | -3.4>,
      Bound<2 | -1>,
      Bound<2 | 1.1>,
      Bound<2 | -1.1>,
      Bound<2 | -1.00000>,
      Bound<2 | 9.999999999>,
      unknown[] extends ArrayN<0, unknown> ? true : never,
      (string | number)[] extends ArrayN<0, string | number> ? true : never,

      // Error:
      // Bound<-2.1 | number>,
      // Bound<-2.0 | number>,
      // Bound<-2 | number>,
      // Bound<-1 | number>,
      // Bound<0 | number>,
      // Bound<1 | number>,
      // Bound<2 | number>,
      // Bound<2.0 | number>,
      // Bound<2.1 | number>,
      // Bound<2.1 | number>,
      // unknown[] extends ArrayN<0, unknown | string> ? true : never,
    ];
    F: [
      ArrayN<never>,
      ArrayN<never, never>,
      ArrayN<number, never>,
      ArrayN<2.1, never>,
      ArrayN<2.0, never>,
      ArrayN<2, never>,
      ArrayN<1, never>,
      ArrayN<0, never>,
      ArrayN<-1, never>,
      ArrayN<-2, never>,
      ArrayN<-2.0, never>,
      ArrayN<-2.1, never>,
    ];
  }>;
}
