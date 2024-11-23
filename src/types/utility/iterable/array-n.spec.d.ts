declare namespace ArrayN {
  export type Result = 0 | Test<{
    T: [
      ArrayN<1> extends [unknown, ...unknown[]] ? true : never,
      ArrayN<1.00000> extends ArrayN<1> ? true : never,
      ArrayN<1 | 2> extends ArrayN<1> ? true : never,
      ArrayN<1 | 2 | 3> extends ArrayN<1> ? true : never,
      ArrayN<2> extends ArrayN<2> ? true : never,
      ArrayN<2 | 3> extends ArrayN<2> ? true : never,
      // string[]:
      ArrayN extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<number> extends unknown[] ? ArrayN<number> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<typeof NaN> extends unknown[] ? ArrayN<typeof NaN> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<typeof Infinity> extends unknown[] ? ArrayN<typeof Infinity> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<0 | 1> extends unknown[] ? ArrayN<0 | 1> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<0 | 2> extends unknown[] ? ArrayN<0 | 2> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<0 | 1 | 2> extends unknown[] ? ArrayN<0 | 1 | 2> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1> extends unknown[] ? ArrayN<-1> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<1.1> extends unknown[] ? ArrayN<1.1> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1.1> extends unknown[] ? ArrayN<-1.1> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1.00000> extends unknown[] ? ArrayN<-1.00000> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<9.999999999> extends unknown[] ? ArrayN<9.999999999> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1.1 | 3.4> extends unknown[] ? ArrayN<-1.1 | 3.4> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1.1 | -3.4> extends unknown[] ? ArrayN<-1.1 | -3.4> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1 | 3.4> extends unknown[] ? ArrayN<-1 | 3.4> extends [unknown, ...unknown[]] ? never : true : never,
      ArrayN<-1 | -3.4> extends unknown[] ? ArrayN<-1 | -3.4> extends [unknown, ...unknown[]] ? never : true : never,

      // BUG: should be unknown[] (actual: [unknown, unknown, ...unknown[]]):
      // ArrayN<2 | -1> extends unknown[] ? ArrayN<2 | -1> extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<2 | 1.1> extends unknown[] ? ArrayN<2 | 1.1> extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<2 | -1.1> extends unknown[] ? ArrayN<2 | -1.1> extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<2 | -1.00000> extends unknown[] ? ArrayN<2 | -1.00000> extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<2 | 9.999999999> extends unknown[] ? ArrayN<2 | 9.999999999> extends [unknown, ...unknown[]] ? never : true : never,
      // End BUG: should be unknown[] (actual: [unknown, unknown, ...unknown[]])

      // Error (string[]):
      // ArrayN<0> extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<-0> extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<0 | number> extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<1 | number> extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
      // ArrayN<2 | number> extends unknown[] ? ArrayN extends [unknown, ...unknown[]] ? never : true : never,
    ];
    F: [
      ArrayN<never>,
    ];
  }>;
}
