const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  protected parse(host: string): string {
    return host;
  }
}

module.exports = Host;
