declare type Keys<O> = Extract<
  keyof O,
  string
>;

declare type Unrequire<
  O,
  K extends keyof O,
> =
  & Omit<O, K>
  & Pick<Partial<O>, K>
;
