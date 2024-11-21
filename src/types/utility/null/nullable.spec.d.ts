declare namespace Nullable {
  type Result = 0 | Test<{
    T: {
      a: Nullable<string>;
      a0: Nullable<string | null>;
      b: Nullable<string | undefined>;
      d: Nullable<string | null | undefined>;
      e: Nullable<string | int | null>;
      f: Nullable<NonNullable<undefined | string>>;
      g: Nullable<"" | 5>;
      z: Nullable<never>; // null
    };
    F: {
      a: never;
    };
  }>;
}
