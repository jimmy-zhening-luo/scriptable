declare namespace ArrayN {
  export type Result = 0 | Test<{
    T: [
      ArrayN<1>,
      ArrayN<1.00000>,
      ArrayN<1 | 2>,
      ArrayN<1 | 2 | 3>,
      ArrayN<2>,
      ArrayN<2 | 3>,
      // string[]:
      ArrayN,
      ArrayN<number>,
      ArrayN<typeof NaN>,
      ArrayN<typeof Infinity>,
      ArrayN<0 | 1>,
      ArrayN<0 | 2>,
      ArrayN<0 | 1 | 2>,
      ArrayN<-1>,
      ArrayN<1.1>,
      ArrayN<-1.1>,
      ArrayN<-1.00000>,
      ArrayN<9.999999999>,
      ArrayN<2 | -1>,
      ArrayN<2 | 1.1>,
      ArrayN<2 | -1.1>,
      ArrayN<2 | -1.00000>,
      ArrayN<2 | 9.999999999>,
      ArrayN<-1.1 | 3.4>,
      ArrayN<-1.1 | -3.4>,
      ArrayN<-1 | 3.4>,
      ArrayN<-1 | -3.4>,
      // Error (string[]):
      // ArrayN<0>,
      // ArrayN<-0>,
      // ArrayN<0 | number>,
      // ArrayN<1 | number>,
      // ArrayN<2 | number>,
    ];
    F: [
      ArrayN<never>,
    ];
  }>;
}
