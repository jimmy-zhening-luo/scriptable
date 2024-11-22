declare namespace Nullable {
  export type Result = 0 | Test<{
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
      // null:
      y: Nullable<never>;
      y0: Nullable<NonNullable<never>>;
      // Error:
      // z: Nullable<string | never> /* string | null */;
      // z0: Nullable<5 | NonNullable<never>> /* 5 | null */;
    };
    F: {
      a: never;
    };
  }>;
}
