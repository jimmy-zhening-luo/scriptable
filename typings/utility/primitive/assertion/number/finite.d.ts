declare const finite: unique symbol;
declare type finite = number & {
  [finite]: true;
};
declare type finiteful = finite & numberful;
