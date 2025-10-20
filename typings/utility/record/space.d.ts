type Space<
  Key extends
  | string
  | number
  | symbol,
> = Record<
  Key,
  Key
>;
