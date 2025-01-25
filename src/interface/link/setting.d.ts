import type Url from "../../lib/object/url";

export interface LinkSetting {
  hosts: {
    preserve: readonly Url["host"][];
    swap: Endomap<Url["host"]>;
  };
  queries: {
    remove: readonly Url["host"][];
  } & Record<
    | "include"
    | "exclude",
    Record<
      Url["host"],
      readonly string[]
    >
  >;
  fragments: {
    trim: readonly Url["host"][];
  };
}
