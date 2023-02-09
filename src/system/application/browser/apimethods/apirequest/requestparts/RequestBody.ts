abstract class RequestBody {
  private body: any;

  constructor(body?: string | any) {
    this.body = body || "";
  }
}

module.exports = RequestBody;
