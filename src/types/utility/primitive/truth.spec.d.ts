declare namespace Truth {
  export type Result = 0 | Test<{
    T: {
      T0: Truth<true>;
    };
    F: {
      N0: Truth<never>;
      N1: Truth<false>;
      N1a: Truth<false | true>;
      N1b: Truth<boolean>;
      // Error:
      // N2: True<true | 10>;
      // N2a: True<true | object>;
      // N2b: True<true | undefined>;
      // N2c: True<true | null>;
      // N2d: True<0>;
      // N2e: True<1>;
      // N2f: True<number>;
      // N2g: True<"">;
      // N2h: True<"true">;
      // N2i: True<"foo">;
      // N2j: True<null>;
      // N2k: True<undefined>;
      // N2l: True<[]>;
      // N2m: True<object>;
    };
  }>;
}
