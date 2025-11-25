declare namespace IsArray {
  export type Result = 0 | Test<{
    T: [
      IsArray<[]>,
      IsArray<[1, 1]>,
      IsArray<string[]>,
      IsArray<readonly []>,
      IsArray<readonly [1, 1]>,
      IsArray<readonly string[]>,
      IsArray<[[]]>,
      IsArray<string[] | integer[]>,
      IsArray<(string | integer)[]>,
      IsArray<
        | [0, 1]
        | [0, "foo"]
        | string[]
      >,
      IsArray<
        | readonly [0, 1]
        | readonly [0, "foo"]
        | readonly string[]
      >,
      IsArray<
        | readonly [0, 1]
        | [0, "foo"]
        | string[]
        | number[]
      >,
      IsArray<[1?, ...string[]]>,
      IsArray<[1] | [1, 2?]>,
      IsArray<[]>,
      IsArray<[] & { [full]: "array" }>,
    ];
    F: [
      IsArray<"">,
      IsArray<"test">,
      IsArray<string>,
      IsArray<boolean>,
      IsArray<true>,
      IsArray<false>,
      IsArray<0>,
      IsArray<1>,
      IsArray<number>,
      IsArray<null>,
      IsArray<undefined>,
      IsArray<unknown>,
      IsArray<never>,
      IsArray<void>,
      IsArray<() => void>,
      IsArray<(a: string) => []>,
      IsArray<Record<string, unknown>>,
      IsArray<Record<number, 5>>,
      IsArray<stringful>,
      IsArray<{ 0: string }>,
      IsArray<symbol>,
      IsArray<object>,
      IsArray<[] | object>,
      IsArray<[] | string>,
      IsArray<[] | null>,
    ];
  }>;
}
