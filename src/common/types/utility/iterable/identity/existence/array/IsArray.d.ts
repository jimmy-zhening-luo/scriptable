declare type IsArray<
  Arr,
> = Flat<
  Arr
> extends never
  ? Arr extends unknown[]
    ? true
    : Arr extends readonly unknown[]
      ? true
      : false
  : true;
