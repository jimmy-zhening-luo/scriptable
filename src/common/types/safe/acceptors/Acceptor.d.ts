declare type Acceptor<
  Type,
  Condition,
  SafeType extends
  & Type
  & Safe<
    Type
    ,
    Condition
  >
  ,
> = (
  value: Type
)=>
  value is
  & Type
  & SafeType
;
