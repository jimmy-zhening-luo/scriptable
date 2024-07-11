declare type Unrequire<
  R,
  Optional,
> = Optional extends boolean
  ? Optional extends true
    ? Partial<R>
    : R
  :
    & Omit<
      R,
      Extract<Optional, Keys<R>>
    >
    & Pick<
      Partial<R>,
      Extract<Optional, Keys<R>>
    >
;
