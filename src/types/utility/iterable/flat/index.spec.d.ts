declare namespace Flat {
  export type Result = 0 | Test<{
    T: {
      a: Flat<string[]>;
      a0: Flat<readonly string[]>;
      // string | number:
      b: Flat<(string | number)[]>;
      b0: Flat<readonly (string | number)[]>;
      c: Flat<string[] | number[]>;
      c0: Flat<readonly string[] | readonly number[]>;
      // unknown:
      d: Flat<unknown[]>;
      d0: Flat<string[] | unknown[]>;
      d1: Flat<readonly unknown[]>;
      d2: Flat<string[] | readonly unknown[]>;
      d3: Flat<readonly string[] | unknown[]>;
      d4: Flat<readonly string[] | readonly unknown[]>;
      // Errors:
      // z: Flat<(string | unknown)[]>;
      // z0: Flat<readonly (string | unknown)[]>;
    };
    F: {
      a: Flat<never>;
      b: Flat<never[]>;
      b0: Flat<readonly never[]>;
      d: Flat<string[] | never[]>;
      // Errors:
      // z: Flat<string | (number[])>;
      // z0: Flat<string | (readonly number[])>;
      // z1: Flat<never | string[]>;
      // z2: Flat<unknown>;
    };
  }>;
}
