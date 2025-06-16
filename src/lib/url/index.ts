import regex from "./regex";

export default class Url {
  public readonly scheme;
  public readonly host;
  public readonly path;
  public readonly query;
  public readonly fragment;

  constructor(string = "") {
    try {
      if (string === "")
        throw new URIError("Empty string cannot be an URL");

      const parts = Url.parse(string);

      if (parts === null)
        throw new URIError(
          "Not parseable to URL",
          { cause: string },
        );

      this.scheme = parts.scheme;
      this.host = parts.host;
      this.path = parts.path;
      this.query = parts.query;
      this.fragment = parts.fragment;
    }
    catch (e) {
      throw new URIError(
        "Failed to parse URL",
        { cause: e },
      );
    }
  }

  private static parse(string: string) {
    const match = regex.exec(string);

    if (match === null)
      return null;

    const {
      scheme,
      host,
      path,
      query = "?",
      fragment = "#",
    } = match.groups as {
      scheme: stringfully<"URL:scheme">;
      host: string;
      path: string;
      query?: string;
      fragment?: string;
    };

    return {
      scheme,
      host,
      path,
      query,
      fragment,
    };
  }
}
