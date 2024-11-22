declare namespace Arrayed {
  export type Result = 0 | Test<{
    T: [
      Arrayed<[]>,
      Arrayed<[1, 1]>,
      Arrayed<string[]>,
      Arrayed<readonly []>,
      Arrayed<readonly [1, 1]>,
      Arrayed<readonly string[]>,
      Arrayed<[[]]>,
      Arrayed<string[] | int[]>,
      Arrayed<(string | int)[]>,
      Arrayed<
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
      >,
      Arrayed<[1?, ...string[]]>,
      Arrayed<[1] | [1, 2?]>,
    ];
    F: [
      Arrayed<"">,
      Arrayed<"test">,
      Arrayed<string>,
      Arrayed<boolean>,
      Arrayed<true>,
      Arrayed<false>,
      Arrayed<0>,
      Arrayed<1>,
      Arrayed<number>,
      Arrayed<null>,
      Arrayed<undefined>,
      Arrayed<unknown>,
      Arrayed<never>,
      Arrayed<void>,
      Arrayed<() => void>,
      Arrayed<(a: string) => []>,
      Arrayed<Record<string, unknown>>,
      Arrayed<Record<number, 5>>,
      Arrayed<stringful>,
      Arrayed<{ 0: string }>,
      Arrayed<symbol>,
      Arrayed<object>,
      Arrayed<[] | object>,
      Arrayed<[] | string>,
      Arrayed<[] | null>,
    ];
  }>;
}
