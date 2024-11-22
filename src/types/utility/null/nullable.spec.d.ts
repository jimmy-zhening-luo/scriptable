declare namespace Nullable {
  export type Result = 0 | Test<{
    T: [
      Nullable<string>,
      Nullable<string | null>,
      Nullable<string | undefined>,
      Nullable<string | null | undefined>,
      Nullable<string | int | null>,
      Nullable<NonNullable<undefined | string>>,
      Nullable<NonNullable<null | string>>,
      Nullable<NonNullable<undefined | Null<string>>>,
      Nullable<"" | 5>,
      // null:
      Nullable<never>,
      Nullable<NonNullable<never>>,
      // Error:
      // Nullable<string | never>,
      // Nullable<5 | NonNullable<never>>,
    ];
    F: [
      never,
    ];
  }>;
}
