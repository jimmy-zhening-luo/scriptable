declare const joined: unique symbol;

type Joined<A> = { [joined]: A };

declare type Joint<
  S extends stringful,
  Full extends boolean
> = Full extends true
  ? Joined<Arrayful<S>>
  : Joined<S[]>;
