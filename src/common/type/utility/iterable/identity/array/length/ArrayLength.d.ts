declare type ArrayLength<A extends readonly unknown[]> = MinLength<ArrayType<A>["length"]>;

declare namespace ArrayLength {
  export type T0 = ArrayLength<[]>;
  export type T0a = ArrayLength<string[]>;
  export type T0b = ArrayLength<readonly []>;
  export type T0d = ArrayLength<readonly string[]>;
  export type T0c = ArrayLength<[string?, string?]>;
  export type T1 = ArrayLength<[string] | [string, string?, string?]>;
  export type T1b = ArrayLength<[string] | [string?, string?, string?]>;
}

declare namespace NotArrayLength {

}
