declare type IsArrayful<
  A,
> = IsArray<
  A
> extends false
  ? false
  : 0 extends ArrayMinLength<
    A
  >
    ? false
    : true;
