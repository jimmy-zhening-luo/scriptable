declare namespace Truth {
  export type Result = 0 | Test<{
    T: [
      Truth<true>,
    ];
    F: [
      Truth<false>,
      Truth<boolean>,
      Truth<true | false>,
      Truth<never>,
      // Error:
      // Truth<false | 0>,
      // Truth<false | 1>,
      // Truth<false | 2>,
      // Truth<true | 0>,
      // Truth<true | 1>,
      // Truth<true | 2>,
      // Truth<true | object>,
      // Truth<true | undefined>,
      // Truth<true | null>,
      // Truth<0>,
      // Truth<1>,
      // Truth<number>,
      // Truth<"">,
      // Truth<"true">,
      // Truth<"foo">,
      // Truth<null>,
      // Truth<undefined>,
      // Truth<[]>,
      // Truth<object>,
    ];
  }>;
}
