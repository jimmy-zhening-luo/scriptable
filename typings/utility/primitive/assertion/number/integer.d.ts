declare const integer: unique symbol;
declare type integer = finite & {
  [integer]: true;
};
