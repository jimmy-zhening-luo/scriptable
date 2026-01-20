declare type falsy
= | nullish
  | false
  | ""
  | 0 /* -0 */
  | 0n;
//| NaN

declare type Falsy<T> = T & falsy;
