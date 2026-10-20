export type { Timezone } from "./timezone";

declare const Date: unique symbol;
export type Dateful = Date & {
  [Date]: true;
};
