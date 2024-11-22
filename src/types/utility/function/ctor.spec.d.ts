declare namespace Constructor {
  export type Result = 0 | Test<{
    T: {
      a: Constructor<typeof TestClass>;
      b: Constructor<typeof TestAbstractParent>;
      c: Constructor<typeof TestChildA>;
      c0: Constructor<typeof TestChildB>;
      x: Constructor<typeof TestClass | typeof TestAbstractParent>;
      x0: Constructor<typeof TestClass | typeof TestChildA>;
      x1: Constructor<typeof TestClass | typeof TestChildA | typeof TestChildB>;
      x2: Constructor<typeof TestChildA | typeof TestChildB>;
      x3: Constructor<typeof TestAbstractParent | typeof TestChildA> /* typeof TestAbstractParent */;
      x4: Constructor<typeof TestAbstractParent & typeof TestChildA> /* typeof TestChildA */;
      x5: Constructor<typeof TestAbstractParent & typeof TestChildB> /* typeof TestChildB */;
      x6: Constructor<typeof TestAbstractParent | typeof TestChildA | typeof TestChildB> /* typeof TestAbstractParent */;
      x7: Constructor<typeof TestChildA | typeof TestChildB> /* typeof TestChildA | typeof TestChildB */;
      x8: Constructor<typeof TestAbstractParent & (typeof TestChildA | typeof TestChildB)> /* typeof TestChildA | typeof TestChildB */;
      x9: Constructor<typeof TestAbstractParent<"A">>;
      x10: Constructor<typeof TestAbstractParent<"A | B">>;
      x10a: Constructor<typeof TestAbstractParent<"A | B">>;
      x10b: Constructor<(typeof TestAbstractParent<"A">) | (typeof TestAbstractParent<"B">)>;
      x10c: Constructor<typeof TestAbstractParent<"A" & "B" & "C">>;
      x10d: Constructor<(typeof TestAbstractParent<"A">) & (typeof TestAbstractParent<"B">) & (typeof TestAbstractParent<"C">)>;
      x10e: Constructor<typeof TestAbstractParent<string>>;
      x10f: Constructor<typeof TestAbstractParent<never>>;
      x11: Constructor<typeof TestAbstractParent<"A"> | typeof TestChildA>;
      x11a: Constructor<typeof TestAbstractParent<string> | typeof TestChildA>;
      x11b: Constructor<typeof TestAbstractParent<never> | typeof TestChildA>;
      x12: Constructor<typeof TestAbstractParent<"A"> & typeof TestChildA>;
      x13: Constructor<typeof TestAbstractParent<"B"> | typeof TestChildA>;
      x14: Constructor<typeof TestAbstractParent<"B"> & typeof TestChildA>;
      x15: Constructor<typeof TestAbstractParent<"C"> | typeof TestChildA>;
      x16: Constructor<typeof TestAbstractParent<"C"> & typeof TestChildA>;
      x17: Constructor<typeof TestAbstractParent<"A" | "B"> | typeof TestChildA>;
      x18: Constructor<typeof TestAbstractParent<"A" | "B"> & typeof TestChildA>;
      x19: Constructor<typeof TestAbstractParent<"A" | "B"> | (typeof TestChildA | typeof TestChildB)>;
      x20: Constructor<typeof TestAbstractParent<"A" | "B"> & (typeof TestChildA | typeof TestChildB)>;
      x21: Constructor<(typeof TestAbstractParent<"A"> | typeof TestAbstractParent<"B">) | (typeof TestChildA | typeof TestChildB)>;
      x22: Constructor<typeof TestAbstractParent<"A" | "B"> & (typeof TestChildA | typeof TestChildB)>;
      x30: Constructor<typeof TestClass & (typeof TestChildA | typeof TestChildB)>;
      // Error:
      // z: Constructor<never | typeof TestClass> /* typeof TestClass */;
    };
    F: {
      a: Constructor<TestClass>;
      a0: Constructor<(typeof TestClass) | TestClass>;
      b: Constructor<string>;
      b0: Constructor<number>;
      b1: Constructor<boolean>;
      b2: Constructor<primitive>;
      c: Constructor<object>;
      c0: Constructor<Record<string, string>>;
      c1: Constructor<() => object>;
      c2: Constructor<() => 1>;
      c3: Constructor<readonly string[]>;
      c4: Constructor<readonly object[]>;
      y: Constructor<never>;
      y0: Constructor<unknown>;
      y1: Constructor<void>;
      y2: Constructor<null>;
      y3: Constructor<undefined>;
      y4: Constructor<null | undefined>;
      // Error:
      // z0: Constructor<never | void>;
      // z1: Constructor<void | null | undefined>;
      // z2: Constructor<never | void | null | undefined>;
      // z3: Constructor<unknown | null | undefined>;
    };
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
