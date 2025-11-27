declare namespace Unflat {
  export type Result = 0 | Test<{
    T: [
      Unflat,
      Unflat<number>,
      Unflat<string | number>,
      Unflat<never[]>,
    ];
    F: [
      Unflat<never>,
    ];
  }>;
}
