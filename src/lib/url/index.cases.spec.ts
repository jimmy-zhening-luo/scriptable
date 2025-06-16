export const TEST_URL = {
  OK: "https://www.example.com/path/to/foo?a=1&b=2&c=3#fragment",
  CASE: {
    OK: {
      httpLocal: "https://localhost/",
      scheme: "scriptable://",
      schemeHost: "scriptable://host",
      schemePath: "scriptable:///",
    },
    ERROR: {
      empty: "",
      nonsense: "$%^&*",
      http: "https://",
      httpPath: "https:///",
      noScheme: "example.com",
      noSchemePath: "example.com/path",
      noSchemeLocal: "localhost/",
    },
  },
};
