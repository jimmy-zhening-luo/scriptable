declare namespace Null {
  type Result = 0 | Test<{
    T: {
      T0: Null<string>;
      T1: Null<string | null>;
      T2: Null<string | undefined>;
      T3: Null<string | null | undefined>;
      T4: Null<string | int | null>;
      T6: Null<NonNullable<undefined | string>>;
      // Error:
      // z: Null<string | never> /* string | undefined */;
    };
    F: {
      a: Null<never>;
    };
  }>;
}
