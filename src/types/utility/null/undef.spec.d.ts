declare namespace Undef {
  export type Result = 0 | Test<{
    T: {
      T0: Undef<string>;
      T1: Undef<string | null>;
      T2: Undef<string | undefined>;
      T3: Undef<string | null | undefined>;
      T4: Undef<string | int | null>;
      T6: Undef<NonNullable<undefined | string>>;
      y: Undef<never>;
      // Error:
      // z: Undef<string | never> /* string | undefined */;
    };
    F: {
      a: never;
    };
  }>;
}
