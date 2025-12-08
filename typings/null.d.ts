declare type nullish
= | null
  | undefined;

declare type falsy
= | nullish
  | false
  | ""
  | 0
  | 0n;
  // ...and NaN
