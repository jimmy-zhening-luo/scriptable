declare type ArrayLength<A extends readonly unknown[]> = Length<ArrayType<A>["length"]>;

declare namespace ArrayLength {
  export type T0 = ArrayLength<[]>;
  export type T0a = ArrayLength<string[]>;
  export type T0b = ArrayLength<readonly []>;
  export type T0d = ArrayLength<readonly string[]>;
  export type T0c = ArrayLength<[string?, string?]>;
  export type T1 = ArrayLength<[string] | [string, string?, string?]>;
  export type T1b = ArrayLength<[string] | [string?, string?, string?]>; // 0 | 1 | 2 | 3 -- empty Tuple -> length: 0 is just 0, so does not consume other possible lengths
  export type T1c = ArrayLength<string[] | [string, string, string]>; // 0 -- Array -> length: number coerced to length 0 but consumes all other possible lengths
}

declare namespace NotArrayLength {
  export type N = ArrayLength<never>;
}
