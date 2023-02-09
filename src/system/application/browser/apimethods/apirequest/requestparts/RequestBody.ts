class RequestBody {
  private body:
    | string
    | RequestBody.RequestBodyInterface;

  constructor(body?:
    | null
    | string
    | RequestBody.RequestBodyInterface)
  {
    this.body = body || "";
  }
}

namespace RequestBody {
  export interface RequestBodyInterface {
    [key: string]: (
      | string
      | number
      | boolean
      | RequestBodyInterface
      | RequestBodyInterface[]
    )
  }
}

module.exports = RequestBody;
