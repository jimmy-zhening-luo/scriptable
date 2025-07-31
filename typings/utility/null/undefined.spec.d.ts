declare namespace Undefined {
  export type Result = 0 | Test<{
    T: [
      Undefined<string>,
      Undefined<string | null>,
      Undefined<string | undefined>,
      Undefined<string | null | undefined>,
      Undefined<string | int | null>,
      Undefined<NonNullable<undefined | string>>,
      Undefined<never>,
      // Error:
      // Undefined<string | never>,
    ];
    F: [
      never,
    ];
  }>;
}
