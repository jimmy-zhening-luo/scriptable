export type { Timezone } from "./timezone";

declare const Dateful: unique symbol;
export type Dateful = Date & {
  [Dateful]: true;
};
