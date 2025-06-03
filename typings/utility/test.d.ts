declare type Test<
  Suite extends Readonly<Record<
    "T" | "F",
    unknown
  >>,
> = Test.Check<Suite["T"]> extends Test.Success<Suite["T"]>
  ? Test.Check<Suite["F"], false> extends Test.Success<Suite["F"]>
    ? true
    : never
  : never;

declare namespace Test {
  export type Check<Cases, Condition extends boolean = true> = {
    readonly [Case in keyof Cases]: Condition extends true
      ? (Cases[Case] extends never ? "FAIL" : "PASS")
      : (Cases[Case] extends never ? "PASS" : "FAIL");
  };
  export type Success<Cases> = {
    readonly [Case in keyof Cases]: "PASS";
  };
}
