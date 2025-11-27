declare namespace True {
  export type Result = 0 | Test<{
    T: [
      True<true>,
      True<true & { [full]: "truth" }>,
      // Errors
    ];
    F: {
      n: True<never>;
      0: True<false>;
      0.1: True<boolean>;
      0.2: True<false | true>;
      // Errors
      // 1: True<false | 0>;
      // 1.1: True<false | 1>;
      // 1.2: True<false | 2>;
      // 2: True<true | 0>;
      // 2.1: True<true | 1>;
      // 2.2: True<true | 2>;
      // 50: True<number>;
      // 50.1: True<0>;
      // 50.2: True<1>;
      // 51: True<string>;
      // 51.1: True<"">;
      // 51.2: True<"foo">;
      // 51.3: True<"true">;
      // 60: True<object>;
      // 60.1: True<object | true>;
      // 61: True<[]>;
      // 99.1: True<undefined>;
      // 99.2: True<null>;
      // 99.3: True<undefined | true>;
      // 99.4: True<null | true>;
      // 99.5: True<undefined | null | true>;
    };
  }>;
}
