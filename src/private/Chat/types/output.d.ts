import type { Response } from "./response";

export type Output =
  | Null<string>
  | Extract<
    Response["output"],
    Field<"type">
  >;
