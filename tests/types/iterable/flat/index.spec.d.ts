declare namespace Flat {
  export type Result = 0 | Test<{
    T: [
      Flat<string[]>,
      Flat<readonly string[]>,

      // string | number:
      Flat<(string | number)[]>,
      Flat<readonly (string | number)[]>,
      Flat<string[] | number[]>,
      Flat<readonly string[] | readonly number[]>,

      // unknown:
      Flat<unknown[]>,
      Flat<readonly unknown[]>,
    ];
    F: [
      Flat<never>,
      Flat<never[]>,
      Flat<readonly never[]>,

      // Errors:
      // Flat<string | (number[])>,
      // Flat<string | (readonly number[])>,
      // Flat<unknown>,
    ];
  }>;
}
