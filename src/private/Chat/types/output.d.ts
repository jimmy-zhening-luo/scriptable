import type { Response } from "./response";

export type Output
= | Null<primitive>
  | Extract<
    Response["output"][0],
    Field<"type">
  >;
