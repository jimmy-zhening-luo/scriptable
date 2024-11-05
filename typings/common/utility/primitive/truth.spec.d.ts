declare namespace Truth {
  export type T0 = Truth<true>;
  export type N0 = Truth<never>;
  export type N1 = Truth<false>;
  export type N1a = Truth<false | true>;
  export type N1b = Truth<boolean>;

  // export type N2 = True<true | 10>;
  // export type N2a = True<true | object>;
  // export type N2b = True<true | undefined>;
  // export type N2c = True<true | null>;
  // export type N2d = True<0>;
  // export type N2e = True<1>;
  // export type N2f = True<number>;
  // export type N2g = True<"">;
  // export type N2h = True<"true">;
  // export type N2i = True<"foo">;
  // export type N2j = True<null>;
  // export type N2k = True<undefined>;
  // export type N2l = True<[]>;
  // export type N2m = True<object>;
}
