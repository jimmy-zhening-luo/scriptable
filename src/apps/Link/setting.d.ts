export interface LinkSetting {
  allow: {
    query: {
      except: ReadonlyRecord<
        string,
        readonly string[]
      >;
    };
  };
  block: {
    query: LinkSetting["allow"]["query"];
    fragment: ReadonlyRecord<string, true>;
  };
  replace: {
    host: Readonly<FieldTable>;
    query: ReadonlyRecord<
      string,
      Readonly<FieldTable>
    >;
  };
}
