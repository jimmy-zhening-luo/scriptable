declare namespace Unflat {
  type Result = 0 | Test<{
    T: {
      a: Unflat;
      b: Unflat<number>;
      c: Unflat<string | number>;
      z: Unflat<never[]> /* never[] | readonly never[][] */;
      z0: Unflat<never[] | never[][]> /* never[] | never[][] | readonly (never[] | never[][])[] */;
    };
    F: {
      a: Unflat<never>;
    };
  }>;
}
