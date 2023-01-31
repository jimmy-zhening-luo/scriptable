class QueryRepeater {
  readonly key: string;
  readonly value: string;
  constructor();
  constructor(param: QueryRepeater);
  constructor(param: QueryRepeater.QueryTuple);
  constructor(param: QueryRepeater.QueryParamObject);
  constructor(param: QueryRepeater.QueryObjectEntry);
  constructor(queryStringSegment: string);
  constructor(key: string, value: string);
  constructor(
    keyHolder?: string | QueryRepeater | QueryRepeater.QueryTuple | QueryRepeater.QueryParamObject | QueryRepeater.QueryObjectEntry,
    value?: string
  ) {
    // parsing TBD
    if (keyHolder === undefined)
      this.key = this.value = String();
    else if (typeof keyHolder === "string") {
      if (value === undefined) {
        keyHolder = keyHolder.trim();
        while (keyHolder.startsWith("?"))
          keyHolder = keyHolder.slice(1);
        while (keyHolder.startsWith("&"))
          keyHolder = keyHolder.slice(1);
        while (keyHolder.endsWith("&"))
          keyHolder = keyHolder.slice(0, -1);
        const queryStringSegment: string = keyHolder;
        const splitQueryStringSegment: string[] = queryStringSegment.split("=");
        if (splitQueryStringSegment.length < 2) {
          this.key = this.value = String();
        }
        else {
          this.key = splitQueryStringSegment.shift() as string;
          this.value = splitQueryStringSegment.join("=") as string;
        }
      }
      else {
        this.key = keyHolder.trim();
        this.value = value.trim();
      }
    }
    else if (Array.isArray(keyHolder)) {
      if (keyHolder.length < 2)
        this.key = this.value = String();
      else {
        this.key = keyHolder.shift() as string;
        this.value = keyHolder.shift() as string;
      }
    }
    else {
      this.key = keyHolder.key;
      this.value = keyHolder.value;
    }
  }
}

namespace QueryRepeater {
  export type QueryTuple = [
    key: string,
    value: string
  ];

  export type QueryParamObject = {
    key: string,
    value: string
  }

  export type QueryObjectEntry = QueryTuple;
}
