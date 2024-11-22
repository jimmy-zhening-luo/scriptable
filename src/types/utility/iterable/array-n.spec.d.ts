declare namespace ArrayN {
  export type Result = 0 | Test<{
    T: {
      a: ArrayN /* string[] */;
      a0: ArrayN<number> /* string[] */;
      a1: ArrayN<typeof NaN> /* string[] */;
      a2: ArrayN<typeof Infinity> /* string[] */;
      b: ArrayN<1> /* [string, ...string[]] */;
      b0: ArrayN<1.00000> /* [string, ...string[]] */;
      c: ArrayN<2> /* [string, string, ...string[]] */;
      x: ArrayN<0 | 1> /* string[] */;
      x1: ArrayN<0 | 2> /* string[] */;
      x2: ArrayN<0 | 1 | 2> /* string[] */;
      x3: ArrayN<1 | 2> /* [string, ...string[]] */;
      x4: ArrayN<1 | 2 | 3> /* [string, ...string[]] */;
      x5: ArrayN<2 | 3> /* [string, string, ...string[]] */;
      y: ArrayN<-1> /* string[] */;
      y0: ArrayN<1.1> /* string[] */;
      y1: ArrayN<-1.1> /* string[] */;
      y2: ArrayN<-1.00000> /* string[] */;
      y3: ArrayN<9.999999999> /* string[] */;
      y4: ArrayN<2 | -1>;
      y5: ArrayN<2 | 1.1>;
      y6: ArrayN<2 | -1.1>;
      y7: ArrayN<2 | -1.00000>;
      y8: ArrayN<2 | 9.999999999>;
      y9: ArrayN<-1.1 | 3.4> /* string[] */;
      y10: ArrayN<-1.1 | -3.4> /* string[] */;
      y11: ArrayN<-1 | 3.4> /* string[] */;
      y12: ArrayN<-1 | -3.4> /* string[] */;
      // Error (string[]):
      // z: ArrayN<0>;
      // z0: ArrayN<-0>;
      // z1: ArrayN<0 | number>;
      // z2: ArrayN<1 | number>;
      // z3: ArrayN<2 | number>;
    };
    F: {
      y: ArrayN<never>;
    };
  }>;
}
