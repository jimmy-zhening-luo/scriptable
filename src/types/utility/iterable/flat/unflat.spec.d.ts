declare namespace Unflat {
  export type Result = 0 | Test<{
    T: [
      Unflat,
      Unflat<number>,
      Unflat<string | number>,
      Unflat<never[]>,
      Unflat<never[] | never[][]>,
    ];
    F: [
      Unflat<never>,
    ];
  }>;
}
