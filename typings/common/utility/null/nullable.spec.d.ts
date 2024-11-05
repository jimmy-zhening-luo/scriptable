declare namespace Nullable {
  type OK = Tester<TF> | 0;
  type TF = {
    T: {
      T0: Nullable<string>;
      T1: Nullable<string | null>;
      T2: Nullable<string | undefined>;
      T3: Nullable<string | null | undefined>;
      T4: Nullable<string | int | null>;
      T6: Nullable<NonNullable<undefined | string>>;
    };
  };
}
