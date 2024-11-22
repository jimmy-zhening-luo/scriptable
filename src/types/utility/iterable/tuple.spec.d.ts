declare namespace Tuple {
  export type Result = 0 | Test<{
    T: {
      a: Tuple;
      a0: Tuple<0>;
      a0a: Tuple<1>;
      a0b: Tuple<3>;
      a1: Tuple<2, string | number>;
      a2: Tuple<2 | 3>;
      a3: Tuple<2 | 3, string | number>;
      a4a: Tuple<0>;
      a4b: Tuple<0 | 1>;
    };
    F: {
      a: Tuple<never>;
      a0: Tuple<1, never>;
      a1: Tuple<never, never>;
    };
  }>;
}
