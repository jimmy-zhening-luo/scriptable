export interface LinkSetting<HostString extends stringful> {
  allow: LinkSetting["block"] & {
    host: {
      www: readonly HostString[];
    };
  };
  block: {
    query: {
      all: readonly HostString[];
      except: ReadonlyRecord<
        HostString,
        readonly string[]
      >;
    };
    fragment: readonly HostString[];
  };
  replace: {
    host: Readonly<Endomap<HostString>>;
    query: ReadonlyRecord<
      HostString,
      Readonly<FieldTable>
    >;
  };
}
