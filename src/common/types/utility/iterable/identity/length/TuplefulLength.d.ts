declare type TuplefulLength<
  A,
> = 0 extends TupleLength<
  A
>
  ? never
  : TupleLength<
    A
  >;
