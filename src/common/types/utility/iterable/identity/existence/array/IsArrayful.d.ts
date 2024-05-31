declare type IsArrayful<
  Arr,
> = IsArray<
  Arr
> extends false
  ? false
  : 0 extends ArrayLength<
    Arr
  >
    ? false
    : true;
