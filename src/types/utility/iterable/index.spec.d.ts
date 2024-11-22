declare namespace Arrayed {
  export type Result = 0 | Test<{
    T: {
      a0: Arrayed<[]>;
      a1: Arrayed<[1, 1]>;
      a2: Arrayed<string[]>;
      a3: Arrayed<readonly []>;
      a4: Arrayed<readonly [1, 1]>;
      a5: Arrayed<readonly string[]>;
      a6: Arrayed<[[]]>;
      a7: Arrayed<string[] | int[]>;
      a8: Arrayed<(string | int)[]>;
      a9: Arrayed<
        | []
        | [0, 1]
        | [0, "foo"]
        | string[]
        | number[]
        | (string | number)[]
        | readonly []
        | readonly [0, 1]
        | readonly [0, "foo"]
        | readonly string[]
        | readonly number[]
        | readonly (string | number)[]
      >;
      a10: Arrayed<[1?, ...string[]]>;

      a11: Arrayed<[1] | [1, 2?]>;
    };
    F: {
      a0: Arrayed<"">;
      a1: Arrayed<"test">;
      a2: Arrayed<string>;
      a3: Arrayed<boolean>;
      a4: Arrayed<true>;
      a5: Arrayed<false>;
      a6: Arrayed<0>;
      a7: Arrayed<1>;
      a8: Arrayed<number>;
      a9: Arrayed<null>;
      a10: Arrayed<undefined>;
      a11: Arrayed<unknown>;
      a12: Arrayed<never>;
      a13: Arrayed<void>;
      a14: Arrayed<() => void>;
      a15: Arrayed<(a: string) => []>;
      a16: Arrayed<Record<string, unknown>>;
      a17: Arrayed<Record<number, 5>>;
      a18: Arrayed<stringful>;
      a19: Arrayed<{ 0: string }>;
      a20: Arrayed<{
        0: string;
        length: 1;
      }>;
      a21: Arrayed<symbol>;
      a22: Arrayed<object>;
      a23: Arrayed<
        | []
        | object
      >;
      a24: Arrayed<
        | []
        | string
      >;
      a25: Arrayed<
        | []
        | null
      >;
    };
  }>;
}
