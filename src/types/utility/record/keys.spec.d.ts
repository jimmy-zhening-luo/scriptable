declare namespace Keys {
  const s: unique symbol;

  export type Result = 0 | Test<{
    T: {
      C: Omit<{
        a: "gondola";
        b: "same";
        c?: "york";
      }, "c"> & Partial<"c">;
      T: Keys<{ a: 5 }>;
      T0: Keys<{
        a: 1;
        b?: 2;
      }>;
      T1: Keys<{
        a: 1;
        b: 2;
      }>;
    };
    F: {
      N: Keys<never>;
      N0: Keys<{ [s]: 1 }>;
      N1: Keys<Record<string, 1>>;
      N1b: Keys<Record<stringful, 1>>;
      N1c: Keys<Record<"", 1>>;
      N1d: Keys<Record<number, 1>>;
      N2: Keys<Record<stringful | "30", 1>>;
      N2b: Keys<Record<stringful | "", 1>>;
      N2c: Keys<Record<number | "", 1>>;
      N2d: Keys<Record<number | "c", 1>>;
      N2e: Keys<object>;
      N2f: Keys<{
        a: 1;
        [full]: "cool";
      }>;
      N3: Keys<[]>;
      N3a: Keys<readonly [1, 1]>;
      N4: Keys<
        | {
          a: 1;
          b: 1;
        }
        | object
      >;
      N5: Keys<[1] | { a: 1 }>;
      N5a: Keys<
        | {
          a: 1;
          b: 1;
        }
        | { c: 1 }
      >;
      N5b: Keys<
        | {
          a: 1;
          b: 1;
        }
        | { c?: 1 }
      >;
      // Never
    // N10: Keys<null>;
    // N10a: Keys<undefined>;
    // N10b: Keys<void>;
    // N10c: Keys<unknown>;
    // N11c: Keys<Record<string | "30", 1>>;
    };
  }>;
}
