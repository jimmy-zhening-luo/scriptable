declare const joined: unique symbol;
type Joined<A> = { [joined]: A };

declare type Joint<
  Out extends stringful
  ,
  In extends stringful
  ,
  Full extends boolean = false,
> = Full extends true
  ?
  & Out
  & Joined<
    Arrayful<
      In
    >
  >
  :
    & string
    & Joined<
      In[]
    >
;
