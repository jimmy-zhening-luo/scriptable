declare namespace Constructor {
  export type Result = 0 | Test<{
    T: [
      Constructor<typeof TestClass>,
      Constructor<typeof TestAbstractParent>,
      Constructor<typeof TestChildA>,
      Constructor<typeof TestChildB>,
      Constructor<typeof TestClass | typeof TestAbstractParent>,
      Constructor<typeof TestClass | typeof TestChildA>,
      Constructor<typeof TestClass | typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestAbstractParent | typeof TestChildA>,
      Constructor<typeof TestAbstractParent & typeof TestChildA>,
      Constructor<typeof TestAbstractParent & typeof TestChildB>,
      Constructor<typeof TestAbstractParent | typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestAbstractParent & (typeof TestChildA | typeof TestChildB)>,
      Constructor<typeof TestAbstractParent<"A">>,
      Constructor<typeof TestAbstractParent<"A | B">>,
      Constructor<typeof TestAbstractParent<"A | B">>,
      Constructor<(typeof TestAbstractParent<"A">) | (typeof TestAbstractParent<"B">)>,
      Constructor<typeof TestAbstractParent<"A" & "B" & "C">>,
      Constructor<(typeof TestAbstractParent<"A">) & (typeof TestAbstractParent<"B">) & (typeof TestAbstractParent<"C">)>,
      Constructor<typeof TestAbstractParent<string>>,
      Constructor<typeof TestAbstractParent<never>>,
      Constructor<typeof TestAbstractParent<"A"> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<string> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<never> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"A"> & typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"B"> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"B"> & typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"C"> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"C"> & typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"A" | "B"> | typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"A" | "B"> & typeof TestChildA>,
      Constructor<typeof TestAbstractParent<"A" | "B"> | typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestAbstractParent<"A" | "B"> & (typeof TestChildA | typeof TestChildB)>,
      Constructor<typeof TestAbstractParent<"A"> | typeof TestAbstractParent<"B"> | typeof TestChildA | typeof TestChildB>,
      Constructor<typeof TestAbstractParent<"A" | "B"> & (typeof TestChildA | typeof TestChildB)>,
      Constructor<typeof TestClass & (typeof TestChildA | typeof TestChildB)>,
      // Error:
      // Constructor<never | typeof TestClass>,
    ];
    F: [
      Constructor<TestClass>,
      Constructor<(typeof TestClass) | TestClass>,
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
      // Error:
      // Constructor<never | void>,
      // Constructor<void | null | undefined>,
      // Constructor<never | void | null | undefined>,
      // Constructor<unknown | null | undefined>,
    ];
  }>;
  export class TestClass {
    public foo: string;
  }
  export abstract class TestAbstractParent<Letter extends string> {
    public letter: Letter;
    public letterPlus: `${Letter}+`;
  }
  export abstract class TestChildA extends TestAbstractParent<"A"> {}
  export abstract class TestChildB extends TestAbstractParent<"B"> {}
}
