declare type Acceptor<
  T,
  A extends string,
  ST extends
  & T
  & Safe<
    T
    ,
    A
  >
  ,
> = (
  t: T
)=>
  t is
  & T
  & ST
;
