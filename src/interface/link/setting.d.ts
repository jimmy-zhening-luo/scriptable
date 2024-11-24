import type url from "../../lib/object/url";

export interface LinkSetting {
  hosts: {
    www: readonly ReturnType<typeof url>["host"][];
    swap: Endomap<ReturnType<typeof url>["host"]>;
  };
  queries: {
    remove: readonly ReturnType<typeof url>["host"][];
  } & Record<
    | "include"
    | "exclude",
    Record<
      ReturnType<typeof url>["host"],
      readonly string[]
    >
  >;
  fragments: {
    trim: readonly ReturnType<typeof url>["host"][];
  };
}
