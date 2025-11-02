declare const Dateful: unique symbol;
export type Dateful = Date & {
  [Dateful]: true;
};
