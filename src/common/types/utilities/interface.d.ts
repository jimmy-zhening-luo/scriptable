declare type Keys<O> = Extract<
  keyof O,
  string
>;

declare type Unrequire<
  O,
  K extends Keys<O>,
> =
  & Omit<O, K>
  & Pick<Partial<O>, K>
;
