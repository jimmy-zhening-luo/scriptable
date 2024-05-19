declare const component: unique symbol;

type UrlComponent<UC extends string> = { [component]: literalful<UC> };

declare type urlcomponent<UC extends string> =
  & stringful
  & UrlComponent<UC>;
