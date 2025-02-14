declare namespace Null {
  export type Result = 0 | Test<{
    T: [
      Null<string>,
      Null<string | null>,
      Null<string | undefined>,
      Null<string | null | undefined>,
      Null<string | int | null>,
      Null<NonNullable<undefined | string>>,
      Null<never>,
      // Error:
      // Null<string | never>,
    ];
    F: [
      never,
    ];
  }>;
}
