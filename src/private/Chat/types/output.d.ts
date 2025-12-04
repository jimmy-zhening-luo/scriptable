import type { Response } from "./types";

export type Output =
  | Null<string>
  | Extract<
    Response["output"],
    Field<"type">
  >;
