declare type Interface<R extends object> = [R] extends [object]
  ? [Extract<R, readonly unknown[]>] extends [never]
      ? Required<R> extends Record<infer K, unknown>
        ? Exclude<K, string> extends never
          ? literalful<K & string> extends never
            ? never
            : R
          : never
        : never
      : never
  : never;

declare namespace InterfaceTest {
  export type T = Interface<{ a: 5 }>;
  export type T0 = Interface<{
    a: 1;
    b?: 2;
  }>;
  export type T1 = Interface<{
    a: 1;
    b: 2;
  }>;
  export type T2 = Interface<Record<"a", unknown>>;
  export type T3 = Interface<Record<"a" | "b", unknown>>;
}

declare namespace NotInterface {
  export type N = Interface<never>;
  export type N0 = Interface<object>;
  export type N0a = Interface<Record<"a" | "b" | 5, unknown>>;
  export type N0b = Interface<Record<"a" | "b" | number, unknown>>;
  export type N0c = Interface<Record<string, unknown>>;
  export type N0d = Interface<Record<string | number, unknown>>;
  export type N0e = Interface<Record<stringful, string>>;
  export type N0f = Interface<Record<stringful | "5", string>>;
  export type N1 = Interface<[]>;
  export type N1b = Interface<[1]>;
  export type N1c = Interface<[1, 1]>;
  export type N1d = Interface<number[]>;
  export type N1e = Interface<readonly []>;
  export type N1f = Interface<readonly [1]>;
  export type N1g = Interface<readonly [1, 1]>;
  export type N1h = Interface<readonly number[]>;
  export type N2 = Interface<()=> void>;
  export type N2a = Interface<(a: string)=> boolean>;
  export type N2b = Interface<(a: string)=> string[]>;
  export type N2c = Interface<(a: string)=> object>;
  export type N5 = Interface<[] | { a: 1 }>;
  export type N5a = Interface<[30] | { a: 1 }>;
  export type N5b = Interface<object | []>;
  export type N5c = Interface<
    | {
      a: 1;
      b: 2;
    }
    | {
      a: 1;
      b: 2;
      c: 2;
    }
  >;

  // export type N3 = Interface<stringful>;
  // export type N3b = Interface<numberful>;
  // export type N13c = Interface<string>;
  // export type N13d = Interface<"cool">;
  // export type N13e = Interface<number>;
  // export type N13f = Interface<0>;
  // export type N13g = Interface<1>;
  // export type N13h = Interface<true>;
  // export type N13i = Interface<false>;
  // export type N13j = Interface<boolean>;
  // export type N14 = Interface<null>;
  // export type N14a = Interface<undefined>;
  // export type N14c = Interface<unknown>;
  // export type N15 = Interface<string | { a: cool }>;
  // export type N15b = Interface<Record<"a" | "b" | string, unknown>>;
}

type gg = Extract<{ a: 5 }, readonly unknown[]>;
