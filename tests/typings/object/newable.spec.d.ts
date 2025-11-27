declare namespace Newable {
  export class Class {
    public char: string;
  }
  export abstract class Prototype<Char extends string> {
    public char: Char;
    public charPlus: `${Char}+`;
  }
  export abstract class ChildA extends Prototype<"A"> {}
  export abstract class ChildB extends Prototype<"B"> {}

  export type Result = 0 | Test<{
    T: [
      Newable<typeof Class>,
      Newable<typeof Prototype>,
      Newable<typeof ChildA>,
      Newable<typeof ChildB>,
      Newable<typeof Class | typeof Prototype>,
      Newable<typeof Class | typeof ChildA>,
      Newable<typeof Class | typeof ChildA | typeof ChildB>,
      Newable<typeof ChildA | typeof ChildB>,
      Newable<typeof Prototype | typeof ChildA>,
      Newable<typeof Prototype & typeof ChildA>,
      Newable<typeof Prototype & typeof ChildB>,
      Newable<typeof Prototype | typeof ChildA | typeof ChildB>,
      Newable<typeof ChildA | typeof ChildB>,
      Newable<typeof Prototype & (typeof ChildA | typeof ChildB)>,
      Newable<typeof Prototype<"A">>,
      Newable<typeof Prototype<"A | B">>,
      Newable<typeof Prototype<"A | B">>,
      Newable<(typeof Prototype<"A">) | (typeof Prototype<"B">)>,
      Newable<typeof Prototype<"A" & "B" & "C">>,
      Newable<(typeof Prototype<"A">) & (typeof Prototype<"B">) & (typeof Prototype<"C">)>,
      Newable<typeof Prototype<string>>,
      Newable<typeof Prototype<never>>,
      Newable<typeof Prototype<"A"> | typeof ChildA>,
      Newable<typeof Prototype<string> | typeof ChildA>,
      Newable<typeof Prototype<never> | typeof ChildA>,
      Newable<typeof Prototype<"A"> & typeof ChildA>,
      Newable<typeof Prototype<"B"> | typeof ChildA>,
      Newable<typeof Prototype<"B"> & typeof ChildA>,
      Newable<typeof Prototype<"C"> | typeof ChildA>,
      Newable<typeof Prototype<"C"> & typeof ChildA>,
      Newable<typeof Prototype<"A" | "B"> | typeof ChildA>,
      Newable<typeof Prototype<"A" | "B"> & typeof ChildA>,
      Newable<typeof Prototype<"A" | "B"> | typeof ChildA | typeof ChildB>,
      Newable<typeof Prototype<"A" | "B"> & (typeof ChildA | typeof ChildB)>,
      Newable<typeof Prototype<"A"> | typeof Prototype<"B"> | typeof ChildA | typeof ChildB>,
      Newable<typeof Prototype<"A" | "B"> & (typeof ChildA | typeof ChildB)>,
      Newable<typeof Class & (typeof ChildA | typeof ChildB)>,
      Newable<(typeof Class) | Class> /* expected: new (...args) => Class */
    ];
    F: [
      Newable<Class>,
      Newable<string>,
      Newable<number>,
      Newable<boolean>,
      Newable<primitive>,
      Newable<object>,
      Newable<Record<string, string>>,
      Newable<() => object>,
      Newable<() => 1>,
      Newable<readonly string[]>,
      Newable<readonly object[]>,
      Newable<never>,
      Newable<unknown>,
      Newable<void>,
      Newable<null>,
      Newable<undefined>,
      Newable<null | undefined>,
    ];
  }>;
}
