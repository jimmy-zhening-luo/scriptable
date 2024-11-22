declare namespace Tuple {
  export type Result = 0 | Test<{
    T: [
      Tuple,
      Tuple<0>,
      Tuple<1>,
      Tuple<3>,
      Tuple<2, string | number>,
      Tuple<2 | 3>,
      Tuple<2 | 3, string | number>,
      Tuple<0>,
      Tuple<0 | 1>,
    ];
    F: [
      Tuple<never>,
      Tuple<1, never>,
      Tuple<never, never>,
    ];
  }>;
}
