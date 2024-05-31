declare type IsArray<
  Arr,
> = Flat<
  Arr
> extends never
  ? Arr extends []
    ? true
    : Arr extends readonly []
      ? true
      : false
  : true;
