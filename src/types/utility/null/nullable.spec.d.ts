declare namespace Nullable {
  type Result = 0 | Test<{
    T: {
      a: Nullable<string>;
      a0: Nullable<string | null>;
      b: Nullable<string | undefined>;
      d: Nullable<string | null | undefined>;
      e: Nullable<string | int | null>;
      f: Nullable<NonNullable<undefined | string>>;
      f0: Nullable<NonNullable<null | string>>;
      f1: Nullable<NonNullable<undefined | Null<string>>>;
      g: Nullable<"" | 5>;
      // Error:
      // z: Nullable<string | never> /* string | null */;
      // z0: Nullable<5 | NonNullable<never>> /* 5 | null */;
    };
    F: {
      a: Nullable<never>;
      b: Nullable<NonNullable<never>>;
    };
  }>;
}
