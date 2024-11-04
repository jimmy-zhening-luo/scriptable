declare namespace _Null {
  type OK = Test<TF> | 0;
  type TF = {
    T: {
      T0: Null<string>;
      T1: Null<string | null>;
      T2: Null<string | undefined>;
      T3: Null<string | null | undefined>;
      T4: Null<string | int | null>;
      T6: Null<NonNullable<undefined | string>>;
    };
  };
}
