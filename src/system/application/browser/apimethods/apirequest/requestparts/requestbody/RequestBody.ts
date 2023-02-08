class RequestBody {
  private body: any;

  constructor(body?: string | Api.RequestBodyObject) {
    this.body = body || "";
  }
}

module.exports = RequestBody;
