import WebEngine from "./engine/web";
import type Query from "../query";

class ApiEngine extends WebEngine<"api"> {
  constructor(
    api: string,
    latlong: stringful,
    tags: Dyad<stringful>,
    separator?: string,
    encodeComponent?: boolean,
  ) {
    super(
      "api",
      [api],
      latlong,
      tags,
      separator,
      encodeComponent,
    );
  }
}

export default ApiEngine;
