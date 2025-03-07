import type Url from "../lib/object/url";

export interface LinkSetting {
  readonly hosts: {
    readonly www: readonly Url["host"][];
    readonly canonical: Endomap<Url["host"]>;
  };
  readonly queries: Readonly<Record<
    | "include"
    | "exclude",
    Record<Url["host"], readonly stringful[]>
  >> & {
    readonly remove: readonly Url["host"][];
    readonly substitute: Record<Url["host"], FieldTable>;
  };
  readonly fragments: {
    readonly shave: readonly Url["host"][];
  };
}
