declare namespace Constructor {
  export class Class {
    public letter: string;
  }
  export abstract class Prototype<Letter extends string> {
    public letter: Letter;
  }
  export abstract class ChildA extends Prototype<"A"> {}
  export abstract class ChildB extends Prototype<"B"> {}

  export type Result = 0 | Test<{
    T: [
      Constructor<typeof Class>,
      Constructor<typeof Prototype>,
      Constructor<typeof ChildA>,
      Constructor<typeof ChildB>,
      Constructor<typeof Class | typeof Prototype>,
      Constructor<typeof Class | typeof ChildA>,
      Constructor<typeof Class | typeof ChildA | typeof ChildB>,
      Constructor<typeof ChildA | typeof ChildB>,
      Constructor<typeof Prototype | typeof ChildA>,
      Constructor<typeof Prototype & typeof ChildA>,
      Constructor<typeof Prototype & typeof ChildB>,
      Constructor<typeof Prototype | typeof ChildA | typeof ChildB>,
      Constructor<typeof ChildA | typeof ChildB>,
      Constructor<typeof Prototype & (typeof ChildA | typeof ChildB)>,
      Constructor<typeof Prototype<"A">>,
      Constructor<typeof Prototype<"A | B">>,
      Constructor<typeof Prototype<"A | B">>,
      Constructor<(typeof Prototype<"A">) | (typeof Prototype<"B">)>,
      Constructor<typeof Prototype<"A" & "B" & "C">>,
      Constructor<(typeof Prototype<"A">) & (typeof Prototype<"B">) & (typeof Prototype<"C">)>,
      Constructor<typeof Prototype<string>>,
      Constructor<typeof Prototype<never>>,
      Constructor<typeof Prototype<"A"> | typeof ChildA>,
      Constructor<typeof Prototype<string> | typeof ChildA>,
      Constructor<typeof Prototype<never> | typeof ChildA>,
      Constructor<typeof Prototype<"A"> & typeof ChildA>,
      Constructor<typeof Prototype<"B"> | typeof ChildA>,
      Constructor<typeof Prototype<"B"> & typeof ChildA>,
      Constructor<typeof Prototype<"C"> | typeof ChildA>,
      Constructor<typeof Prototype<"C"> & typeof ChildA>,
      Constructor<typeof Prototype<"A" | "B"> | typeof ChildA>,
      Constructor<typeof Prototype<"A" | "B"> & typeof ChildA>,
      Constructor<typeof Prototype<"A" | "B"> | typeof ChildA | typeof ChildB>,
      Constructor<typeof Prototype<"A" | "B"> & (typeof ChildA | typeof ChildB)>,
      Constructor<typeof Prototype<"A"> | typeof Prototype<"B"> | typeof ChildA | typeof ChildB>,
      Constructor<typeof Prototype<"A" | "B"> & (typeof ChildA | typeof ChildB)>,
      Constructor<typeof Class & (typeof ChildA | typeof ChildB)>,
      Constructor<(typeof Class) | Class> /* expected: new (...args) => Class */
    ];
    F: [
      Constructor<Class>,
      Constructor<string>,
      Constructor<number>,
      Constructor<boolean>,
      Constructor<primitive>,
      Constructor<object>,
      Constructor<Record<string, string>>,
      Constructor<() => object>,
      Constructor<() => 1>,
      Constructor<readonly string[]>,
      Constructor<readonly object[]>,
      Constructor<never>,
      Constructor<unknown>,
      Constructor<void>,
      Constructor<null>,
      Constructor<undefined>,
      Constructor<null | undefined>,
    ];
  }>;
}
