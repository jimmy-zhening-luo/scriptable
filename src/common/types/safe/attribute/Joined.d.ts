declare const joined: unique symbol;
type Joint<A> = { [joined]: A };

declare type Joined<
  Out extends stringful
  ,
  In extends stringful
  ,
  Full extends boolean = false,
> = Full extends true
  ?
  & Out
  & Joint<
    Arrayful<
      In
    >
  >
  :
    & string
    & Joint<
      In[]
    >
;
