abstract class RequestHeader {
  readonly key?: string | null;
  readonly value?: string | number | boolean | null;

  constructor(keyValue?: [string, string | number | boolean]);
  constructor(key?: string, value?: string | number | boolean);

  constructor(
    keyOrKeyValue?: string | [string, string | number | boolean],
    value?: string | number | boolean
  ) {
    if (keyOrKeyValue === undefined) {
      this.key = null;
      this.value = null;
    }
    else if (Array.isArray(keyOrKeyValue)) {
      this.key = keyOrKeyValue[0];
      this.value = keyOrKeyValue[1];
    }
    else {
      this.key = value ? keyOrKeyValue : null;
      this.value = value ?? null;
    }
  }
}

module.exports = RequestHeader;
