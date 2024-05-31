declare type IsLongArrayful<
  Arr,
> = IsArrayful<
  Arr
> extends false
  ? false
  : 1 extends ArrayMinLength<
    Arr
  >
    ? false
    : true;
