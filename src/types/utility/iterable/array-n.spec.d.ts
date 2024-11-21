declare namespace ArrayN {
  type Result = 0 | Test<{
    T: {
      T: ArrayN;

      //  T0: ArrayN<0>; // string[]
      //  T0a: ArrayN<-0>; // string[]
      T1: ArrayN<1>;
      T2: ArrayN<2>;
      T3: ArrayN<1.00000>;
      Tn: ArrayN<number>; // string[]
      Tna: ArrayN<typeof NaN>; // string[]
      Tnb: ArrayN<typeof Infinity>; // string[]

    };
    F: {
      F: ArrayN<never>;
      F1: ArrayN<-1>;
      F2: ArrayN<1.1>;
      F3: ArrayN<-1.1>;
      F4: ArrayN<-1.00000>;
      F4a: ArrayN<9.999999999>;
    };
  }>;
}
