declare type Test<Suite extends {
  T: unknown;
  F: unknown;
}> =
& (Test.Check<true, Suite["T"]> extends Test.Remap<Suite["T"]> ? true : never)
& (Test.Check<false, Suite["F"]> extends Test.Remap<Suite["F"]> ? true : never);

declare namespace Test {
  export type Remap<Assertions> = {
    [Case in keyof Assertions]: "PASS";
  };
  export type Check<Expect extends boolean, Assertions> = {
    [Case in keyof Assertions]: Expect extends true
      ? (Assertions[Case] extends never ? "FAIL" : "PASS")
      : (Assertions[Case] extends never ? "PASS" : "FAIL");
  };
}
