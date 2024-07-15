declare type Primeval<P extends T, T extends primitive> = Exclude<T, primitive> extends never
  ? Extract<P, object> extends never
    ? Exclude<P, T> extends never
      ? T extends P
        ? never
        : P
      : never
    : never
  : never;

declare namespace Primeval {
  export type T0 = Primeval<"fast", string>;
  export type T0a = Primeval<"", string>;
  export type T0b = Primeval<"fast" | "good", string>;
  export type T0c = Primeval<"fast" | "", string>;
  export type T1 = Primeval<5, number>;
  export type T1a = Primeval<0, number>;
  export type T2 = Primeval<true, boolean>;
  export type T2a = Primeval<false, boolean>;
}

declare namespace NotPrimeval {
  export type N0 = Primeval<string, string>;
  export type N1 = Primeval<number, number>;
  export type N2 = Primeval<boolean, boolean>;

  // export type N0a = Primeval<string | "good", string>;
  // export type N1a = Primeval<number | 5, number>;
  // export type N2a = Primeval<boolean | true, boolean>;
  // export type N3 = Primeval<symbol, symbol>;
  // export type N3b = Primeval<{}, object>;
  // export type N3c = Primeval<[], readonly unknown[]>;
  // export type N3d = Primeval<()=> 5, Function>;
  // export type N3e = Primeval<5, unknown>;
  // export type N4 = Primeval<true | 10, boolean>;
}
