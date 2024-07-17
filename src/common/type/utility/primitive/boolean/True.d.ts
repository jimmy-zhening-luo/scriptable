declare type True<B extends boolean> = true extends Primeval<B, boolean>
  ? Primeval<B, boolean>
  : never;

declare namespace True {
  export type T0 = True<true>;
}

declare namespace NotTrue {

  export type N0 = True<never>;
  export type N1 = True<false>;
  export type N1a = True<false | true>;
  export type N1b = True<boolean>;

  // export type N2 = True<true | 10>;
  // export type N2a = True<true | {}>;
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
  // export type N2m = True<{}>;
}
