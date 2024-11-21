declare namespace It {
  type Result = 0 | Test<{
    T: {
      T0: It<[]>;
      T1: It<[1, 1]>;
      T2: It<string[]>;
      T3: It<readonly []>;
      T4: It<readonly [1, 1]>;
      T5: It<readonly string[]>;
      T6: It<[[]]>;
      T7: It<string[] | int[]>;
      T8: It<(string | int)[]>;
      T9: It<
        | []
        | [5, 10]
        | string []
        | readonly []
        | readonly [5, 10]
        | readonly string[]
      >;
      T10: It<[1?, ...string[]]>;

      T11: It<[1] | [1, 2?]>;
    };
    F: {
      N0: It<"">;
      N1: It<"test">;
      N2: It<string>;
      N3: It<boolean>;
      N4: It<true>;
      N5: It<false>;
      N6: It<0>;
      N7: It<1>;
      N8: It<number>;
      N9: It<null>;
      N10: It<undefined>;
      N11: It<unknown>;
      N12: It<never>;
      N13: It<void>;
      N14: It<() => void>;
      N15: It<(a: string) => []>;
      N16: It<Record<string, unknown>>;
      N17: It<Record<number, 5>>;
      N18: It<stringful>;
      N19: It<{ 0: string }>;
      N20: It<{
        0: string;
        length: 1;
      }>;
      N21: It<symbol>;
      N22: It<object>;
      N23: It<
        | []
        | object
      >;
      N24: It<
        | []
        | string
      >;
      N25: It<
        | []
        | null
      >;
    };
  }>;
}
