declare type Optionalize<
  R extends object,
  OptionalKey extends keyof R,
>
  = & {
      readonly [Key in Exclude<keyof R, OptionalKey>]: R[Key];
    }
    & {
      readonly [Key in OptionalKey]?: R[Key];
    }
    ;
