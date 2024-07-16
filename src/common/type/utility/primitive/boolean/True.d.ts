declare type True<B extends boolean> = Primeval<B, boolean> extends never
  ? never
  : B extends true
    ? B
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
  // export type N3 = True<0>;
  // export type N4 = True<1>;
  // export type N5 = True<number>;
  // export type N6 = True<"">;
  // export type N7 = True<"true">;
  // export type N8 = True<"foo">;
  // export type N9 = True<null>;
  // export type N10 = True<undefined>;
  // export type N11 = True<[]>;
  // export type N12 = True<{}>;
}
