declare type IsArrayful<
  Arr,
> = IsArray<
  Arr
> extends false
  ? false
  : 0 extends ArrayMinLength<
    Arr
  >
    ? false
    : true;
