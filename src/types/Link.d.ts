import type Url from "../app/lib/url";

export interface LinkSetting {
  readonly allow: {
    readonly host: {
      readonly www: readonly Url["host"][];
    };
    readonly query: {
      readonly all: readonly Url["host"][];
      readonly except: Readonly<Record<
        Url["host"],
        readonly stringful[]
      >>;
    };
    readonly fragment: readonly Url["host"][];
  };
  readonly block: {
    readonly query: {
      readonly all: readonly Url["host"][];
      readonly except: Readonly<Record<
        Url["host"],
        readonly stringful[]
      >>;
    };
    readonly fragment: readonly Url["host"][];
  };
  readonly replace: {
    readonly host: Endomap<Url["host"]>;
    readonly query: Readonly<
      Record<
        Url["host"],
        FieldTable
      >>;
  };
}
