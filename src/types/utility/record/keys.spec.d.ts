declare namespace Keys {
  const s: unique symbol;

  export type Result = 0 | Test<{
    T: [
      Omit<{ a: number; b: number; c?: number }, "c"> & Partial<"c">,
      Keys<{ a: number }>,
      Keys<{ a: number; b?: number }>,
      Keys<{ a: number; b: number }>,
    ];
    F: [
      Keys<never>,
      Keys<{ [s]: number }>,
      Keys<{ [s]: number; a: number }>,
      Keys<Record<string, number>>,
      Keys<Record<stringful, number>>,
      Keys<Record<"", number>>,
      Keys<Record<number, number>>,
      Keys<Record<stringful | "1", number>>,
      Keys<Record<stringful | "", number>>,
      Keys<Record<number | "", number>>,
      Keys<Record<number | "foo", number>>,
      Keys<object>,
      Keys<[]>,
      Keys<readonly [number, number]>,
      Keys<{ a: number; b: number } | object>,
      Keys<[number] | { a: number }>,
      Keys<{ a: number; b: number } | { c: number }>,
      Keys<{ a: number; b: number } | { c?: number }>,
      // Never
      // Keys<null>,
      // Keys<undefined>,
      // Keys<void>,
      // Keys<unknown>,
      // Keys<Record<string | "1", number>>,
    ];
  }>;
}
