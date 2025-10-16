declare const finite: unique symbol;
declare type finite = numberful & {
  [finite]: true;
};
