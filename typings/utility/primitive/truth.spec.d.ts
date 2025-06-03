declare namespace Truth {
  export type Result = 0 | Test<{
    T: [
      Truth<true>,
      Truth<true & { [full]: "truth" }>,
      // Errors
    ];
    F: {
      n: Truth<never>;
      0: Truth<false>;
      0.1: Truth<boolean>;
      0.2: Truth<false | true>;
      // Errors
      // 1: Truth<false | 0>;
      // 1.1: Truth<false | 1>;
      // 1.2: Truth<false | 2>;
      // 2: Truth<true | 0>;
      // 2.1: Truth<true | 1>;
      // 2.2: Truth<true | 2>;
      // 50: Truth<number>;
      // 50.1: Truth<0>;
      // 50.2: Truth<1>;
      // 51: Truth<string>;
      // 51.1: Truth<"">;
      // 51.2: Truth<"foo">;
      // 51.3: Truth<"true">;
      // 60: Truth<object>;
      // 60.1: Truth<object | true>;
      // 61: Truth<[]>;
      // 99.1: Truth<undefined>;
      // 99.2: Truth<null>;
      // 99.3: Truth<undefined | true>;
      // 99.4: Truth<null | true>;
      // 99.5: Truth<undefined | null | true>;
    };
  }>;
}
