declare namespace ArrayN {
  type T = ArrayN;

  // type T0 = ArrayN<0>; // string[]
  // type T0a = ArrayN<-0>; // string[]
  export type T1 = ArrayN<1>;
  type T2 = ArrayN<2>;
  type T3 = ArrayN<1.00000>;
  type Tn = ArrayN<number>; // string[]
  type Tna = ArrayN<typeof NaN>; // string[]
  type Tnb = ArrayN<typeof Infinity>; // string[]
  type F = ArrayN<never>;
  type F1 = ArrayN<-1>;
  type F2 = ArrayN<1.1>;
  type F3 = ArrayN<-1.1>;
  type F4 = ArrayN<-1.00000>;
  type F4a = ArrayN<9.999999999>;
}
