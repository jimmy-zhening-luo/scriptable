declare const finite: unique symbol;
declare type finite = number & {
  [finite]: true;
};
