import type url from "../../lib/object/url";

export interface LinkSetting {
  hosts: {
    www: readonly ReturnType<url>["host"][];
    swap: Endomap<ReturnType<url>["host"]>;
  };
  queries: {
    omit: readonly ReturnType<url>["host"][];
  } & Record<
    | "include"
    | "exclude",
    Record<
      ReturnType<url>["host"],
      readonly string[]
    >
  >;
  fragments: {
    trim: readonly ReturnType<url>["host"][];
  };
}
