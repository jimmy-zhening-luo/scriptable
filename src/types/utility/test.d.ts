declare type Test<Suite extends {
  T: unknown;
  F: unknown;
}> =
& (Test.Check.True<Suite["T"]> extends Test.Remap.True<Suite["T"]>
  ? true
  : never)
& (Test.Check.False<Suite["F"]> extends Test.Remap.False<Suite["F"]>
  ? true
  : never);
declare namespace Test {
  export namespace Remap {
    export type True<Assertions> = {
      [Case in keyof Assertions]: "PASS";
    };
    export type False<Assertions> = {
      [Case in keyof Assertions]: "PASS";
    };
  }
  export namespace Check {
    export type True<Assertions> = {
      [Case in keyof Assertions]: Assertions[Case] extends never ? "FAIL" : "PASS";
    };
    export type False<Assertions> = {
      [Case in keyof Assertions]: Assertions[Case] extends never ? "PASS" : "FAIL";
    };
  }
}
