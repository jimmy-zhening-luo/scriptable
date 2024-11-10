declare namespace Nullable {
  type Canary = Tester<Suite> | 0;
  type Suite = {
    T: {
      a: Nullable<string>;
      a0: Nullable<string | null>;
      b: Nullable<string | undefined>;
      d: Nullable<string | null | undefined>;
      e: Nullable<string | int | null>;
      f: Nullable<NonNullable<undefined | string>>;
      g: Nullable<"" | 5>;
    };
    F: {
      a: Nullable<never>;
    };
  };
}
