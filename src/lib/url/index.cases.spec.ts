export const TEST_URL = {
  OK: "https://www.example.com/path/to/foo?a=1&b=2&c=3#fragment",
  CASE: {
    OK: {
      httpLocal: "https://localhost/",
      local: "localhost/",
      scheme: "scriptable://",
      schemeEmpty: "scriptable:///",
      schemeHost: "scriptable://host",
      host: "example.com",
      hostPath: "example.com/path",
    },
    ERROR: {
      empty: "",
      nonsense: "$%^&*",
      http: "https://",
      httpEmpty: "https:///",
    },
  },
};
