declare type Join<A extends readonly unknown[], Sp extends string = string> = Arrayfuled<A> extends never
  ? string
  : Extract<
    Flat<A>,
    stringful
  > extends never
    ? Extract<
      Flat<A>,
      | number
      | boolean
    > extends never
      ? literalful<Flat<A>> extends never
        ? TriadType<A> extends false
          ? string
          : literalful<Sp> extends never
            ? Sp extends stringful
              ? stringful
              :
                | string
                | stringful
            : stringful
        : stringful
      : stringful
    : Exclude<
      Flat<A>,
      stringful
    > extends never
      ? Flat<A>
      : stringful;
