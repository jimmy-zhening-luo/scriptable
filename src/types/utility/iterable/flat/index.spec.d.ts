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
      Flat<string[] | unknown[]>,
      Flat<readonly unknown[]>,
      Flat<string[] | readonly unknown[]>,
      Flat<readonly string[] | unknown[]>,
      Flat<readonly string[] | readonly unknown[]>,
      // Errors:
      // Flat<(string | unknown)[]>,
      // Flat<readonly (string | unknown)[]>,
    ];
    F: [
      Flat<never>,
      Flat<never[]>,
      Flat<readonly never[]>,
      Flat<string[] | never[]>,
      // Errors:
      // Flat<string | (number[])>,
      // Flat<string | (readonly number[])>,
      // Flat<never | string[]>,
      // Flat<unknown>,
    ];
  }>;
}
