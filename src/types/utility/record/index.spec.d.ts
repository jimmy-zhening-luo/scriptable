declare namespace Interface {
  export type Result = 0 | Test<{
    T: { T: Interface<{ a: 5 }>;
      T0: Interface<{
        a: 1;
        b?: 2;
      }>;
      T1: Interface<{
        a: 1;
        b: 2;
      }>;
      T2: Interface<Record<"a", unknown>>;
      T3: Interface<Record<"a" | "b", unknown>>; };
    F: {
      a: Interface<null | { a: 5 }>;
      N: Interface<never>;
      N0: Interface<object>;
      N0a: Interface<Record<"a" | "b" | 5, unknown>>;
      N0b: Interface<Record<"a" | "b" | number, unknown>>;
      N0c: Interface<Record<string, unknown>>;
      N0d: Interface<Record<string | number, unknown>>;
      N0e: Interface<Record<stringful, string>>;
      N0f: Interface<Record<stringful | "5", string>>;
      N1: Interface<[]>;
      N1b: Interface<[1]>;
      N1c: Interface<[1, 1]>;
      N1d: Interface<number[]>;
      N1e: Interface<readonly []>;
      N1f: Interface<readonly [1]>;
      N1g: Interface<readonly [1, 1]>;
      N1h: Interface<readonly number[]>;
      N2: Interface<() => void>;
      N2a: Interface<(a: string) => boolean>;
      N2b: Interface<(a: string) => string[]>;
      N2c: Interface<(a: string) => object>;
      N5: Interface<[] | { a: 1 }>;
      N5a: Interface<[30] | { a: 1 }>;
      N5b: Interface<object | []>;
      N5c: Interface<
        | {
          a: 1;
          b: 2;
        }
        | {
          a: 1;
          b: 2;
          c: 2;
        }
      >;
    // Error:
      // N3: Interface<stringful>;
      // N3b: Interface<numberful>;
      // N13c: Interface<string>;
      // N13d: Interface<"cool">;
      // N13e: Interface<number>;
      // N13f: Interface<0>;
      // N13g: Interface<1>;
      // N13h: Interface<true>;
      // N13i: Interface<false>;
      // N13j: Interface<boolean>;
      // N14: Interface<null>;
      // N14a: Interface<undefined>;
      // N14c: Interface<unknown>;
      // N15: Interface<string | { a: cool }>;
      // N15b: Interface<Record<"a" | "b" | string, unknown>>;
    };
  }>;
}
