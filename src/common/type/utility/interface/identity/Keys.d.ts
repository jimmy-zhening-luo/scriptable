declare type Keys<R extends object> = Interface<R> extends never
  ? never
  : keyof R;

declare namespace Keys {
  export type T = Keys<{ a: 5 }>;
  export type T0 = Keys<{
    a: 5;
    b: unknown;
  }>;
  export type T0a = Keys<{
    a: 5;
    b: unknown;
    c?: string;
  }>;
}

declare namespace NotKeys {
  export type N = Keys<never>;
  export type N0 = Keys<{ [min]: 5 }>;
  export type N1 = Keys<Record<string, 5>>;
  export type N1b = Keys<Record<stringful, 5>>;
  export type N1c = Keys<Record<"", 5>>;
  export type N1d = Keys<Record<number, 5>>;
  export type N2 = Keys<Record<stringful | "30", 5>>;
  export type N2b = Keys<Record<stringful | "", 5>>;
  export type N2c = Keys<Record<number | "", 5>>;
  export type N2d = Keys<Record<number | "c", 5>>;
  export type N2e = Keys<{}>;
  export type N2f = Keys<{
    a: 5;
    [min]: 7;
  }>;
  export type N3 = Keys<[]>;
  export type N3a = Keys<readonly [5, 10]>;
  export type N4 = Keys<{
    a: 5;
    b: 7;
  } | {}>;
  export type N5 = Keys<[5] | { a: 5 }>;
  export type N5a = Keys<
    | {
      a: 5;
      b: 7;
    }
    | { c: 9 }
  >;
  export type N5b = Keys<
    | {
      a: 5;
      b: 7;
    }
    | { c?: 9 }
  >;

  // export type N10 = Keys<null>;
  // export type N10a = Keys<undefined>;
  // export type N10b = Keys<void>;
  // export type N10c = Keys<unknown>;
  // export type N11c = Keys<Record<string | "30", 5>>;
}
