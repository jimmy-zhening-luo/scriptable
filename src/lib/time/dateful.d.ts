declare const Dateful: unique symbol;
declare type Dateful = Date & {
  [Dateful]: true;
};
