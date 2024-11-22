declare namespace Numeric {
  export type Result = 0 | Test<{
    T: {
      a: Numeric<0>;
      a0: Numeric<0.0>;
      a1: Numeric<-0>;
      a2: Numeric<-0.0>;
      b: Numeric<1>;
      b0: Numeric<1.0>;
      c: Numeric<1.1>;
      d: Numeric<-10>;
      d0: Numeric<-10.0>;
      d1: Numeric<-10.1>;
      w: Numeric<0.0000000000000001>;
      w0: Numeric<-0.0000000000000001>;
      w1: Numeric<0.9999999999999999>;
      w2: Numeric<1.000000000000001>;
      x: Numeric<0 | 0.0000000000000000000000000000000000000000000000000000000000000000000001>;
      y: Numeric<0 | 1>;
      y0: Numeric<-0 | 1>;
      y1: Numeric<1 | 2>;
      y2: Numeric<1 | 0.99999999999999>;
      y3: Numeric<-1 | 1>;
      // Error:
      // z: Numeric<0 | -0.0 | -0 | 0.0>;
    };
    F: {
      a: Numeric<never>;
      b: Numeric<number>;
      c: Numeric<numberful>;
      d: Numeric<number | numberful>;
      e: Numeric<typeof NaN>;
      e0: Numeric<typeof Infinity>;
      y: Numeric<0 | numberful>;
      y0: Numeric<1 | numberful>;
      // Error:
      // z: Numeric<1 | number>;
      // z0: Numeric<1 | typeof Infinity>;
      // z1: Numeric<1 | typeof NaN>;
      // z2: Numeric<"foo">;
      // z3: Numeric<"NaN">;
      // z4: Numeric<"1">;
      // z5: Numeric<string>;
      // z6: Numeric<boolean>;
      // z6a: Numeric<true>;
      // z6b: Numeric<false>;
      // z7: Numeric<null>;
      // z8: Numeric<undefined>;
      // z9: Numeric<void>;
      // z10: Numeric<object>;
      // z11: Numeric<[]>;
      // z12: Numeric<1 | true>;
      // z13: Numeric<() => 1>;
      // z14: Numeric<symbol>;
    };
  }>;
}
