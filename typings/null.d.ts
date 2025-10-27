declare type nullish
= | null
  | undefined;

declare type falsy
= | nullish
  | false
  // | NaN
  | 0

  | 0n
  | "";
