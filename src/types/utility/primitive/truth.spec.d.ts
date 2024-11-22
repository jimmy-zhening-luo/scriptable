declare namespace Truth {
  export type Result = 0 | Test<{
    T: {
      a: Truth<true>;
    };
    F: {
      a: Truth<false>;
      b: Truth<boolean>;
      b0: Truth<true | false>;
      y: Truth<never>;
      // Error:
      // d: Truth<false | 0>;
      // d0: Truth<false | 1>;
      // d1: Truth<false | 2>;
      // d2: Truth<true | 0>;
      // d3: Truth<true | 1>;
      // d4: Truth<true | 2>;
      // N2a: Truth<true | object>;
      // N2b: Truth<true | undefined>;
      // N2c: Truth<true | null>;
      // N2d: Truth<0>;
      // N2e: Truth<1>;
      // N2f: Truth<number>;
      // N2g: Truth<"">;
      // N2h: Truth<"true">;
      // N2i: Truth<"foo">;
      // N2j: Truth<null>;
      // N2k: Truth<undefined>;
      // N2l: Truth<[]>;
      // N2m: Truth<object>;
    };
  }>;
}
