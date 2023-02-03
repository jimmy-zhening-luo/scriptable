const shpp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPortPath extends shpp_UrlComposite {
  readonly parts: [SchemeHostPort, Path];
  readonly schemeHostPort: SchemeHostPort = this.parts[0];
  readonly path: Path = this.parts[1];
  constructor(schemeHostPortPath: SchemeHostPortPath);
  constructor(
    schemeHostPort: SchemeHostPort,
    path: Path | string
  );

  constructor(
    schemeHostPortOrSchemeHostPortPath: SchemeHostPort | SchemeHostPortPath,
    path: Path | string = new SchemeHostPortPath._Path()
  ) {
    super();
    this.parts = schemeHostPortOrSchemeHostPortPath instanceof SchemeHostPortPath ?
      schemeHostPortOrSchemeHostPortPath.
      : [
        new SchemeHostPortPath._SchemeHostPort(schemeHostPortOrSchemeHostPortPath),
        new SchemeHostPortPath._Path(path)
      ];
  }
}

namespace SchemeHostPortPath {
  export const _SchemeHostPort: typeof SchemeHostPort = importModule("SchemeHostPort");
  export const _Path: typeof Path = importModule("urlparts/Path");
}
