declare namespace Undef {
  export type Result = 0 | Test<{
    T: [
      Undef<string>,
      Undef<string | null>,
      Undef<string | undefined>,
      Undef<string | null | undefined>,
      Undef<string | int | null>,
      Undef<NonNullable<undefined | string>>,
      Undef<never>,
      // Error:
      // Undef<string | never>,
    ];
    F: [
      never,
    ];
  }>;
}
