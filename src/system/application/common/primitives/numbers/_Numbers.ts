namespace Numbers {
  // digit
  export type nonzerodigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  export type digit = 0 | nonzerodigit;

  export type dotless = dotless.dotless<string>;
  export namespace dotless {
    export type dotless<S extends string> =
      S extends `${string}.${string}` ?
      never
      : S;
  }
  export function dotless<S extends string>(string: dotless.dotless<S>) {
    return string;
  }


  export type digits = digits.digits<number>;
  export namespace digits {
    export type digits<D extends number> =
      `${D}` extends `${Partial<digit>}` ?
      D
      : never;
  }
  export function digits<D extends number>(digits: digits.digits<D>) {
    return digits;
  }
  export const d: digits = digits(5);

  // number
  export type real = irrational | rational;
  export type irrational = pi | tau | e | phi;
  export type trunc<Value extends number, Base extends number> =
    `${Value}` extends `${Base}${string}` ?
    never
    : N;

  3.14159;
  export type tau = 6.28318;  // pi * 2
  export type e = 2.71828;    // Euler's number
  export type phi = 1.61803;  // golden ratio

  export type zero = 0 | -0;
  export type nonzero<N extends number> = Exclude<N, zero>;

  export type rational = integer | fraction;

  export type positive<N extends number> =
    N extends zero ?
    N
    : `${N}` extends `-${string}` ?
    never
    : N;

  export type negative<N extends number> =
    N extends zero ?
    N
    : `${N}` extends `-${string}` ?
    N
    : never;

  export type integer<N extends number> =
    `${N}` extends `${string}.${string}` ?
    never
    : N;

  export function integer<N extends number>(n: integer<N>) {
    return n;
  }

  export const num: integer<number> = 5.2;

}
