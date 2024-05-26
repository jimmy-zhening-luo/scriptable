declare type IsLongArrayful<
  A,
> = IsArrayful<
  A
> extends false
  ? false
  : 1 extends ArrayMinLength<
    A
  >
    ? false
    : true;
