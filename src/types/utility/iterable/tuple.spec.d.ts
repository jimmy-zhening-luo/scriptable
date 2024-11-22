declare namespace Tuple {
  export type Result = 0 | Test<{
    T: {
      T: Tuple;
      T0: Tuple<0>;
      T0a: Tuple<1>;
      T0b: Tuple<3>;
      T1: Tuple<2, string | number>;
      T2: Tuple<2 | 3>;
      T3: Tuple<2 | 3, string | number>;
      T4a: Tuple<0>;
      T4b: Tuple<0 | 1>;
    };
    F: {
      a: Tuple<never>;
      a0: Tuple<1, never>;
      a1: Tuple<never, never>;
    };
  }>;
}
