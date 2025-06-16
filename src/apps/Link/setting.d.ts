export interface LinkSetting<HostString extends stringful> {
  allow: {
    query: {
      except: ReadonlyRecord<HostString, readonly string[]>;
    };
  };
  block: {
    query: LinkSetting<HostString>["allow"]["query"];
    fragment: ReadonlyRecord<HostString, true>;
  };
  replace: {
    host: Readonly<
      Endomap<HostString>
    >;
    query: ReadonlyRecord<
      HostString,
      Readonly<FieldTable>
    >;
  };
}
