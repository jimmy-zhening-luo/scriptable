export class OneRepeatedChar extends NRepeatedChar {
  constructor(
    ...charsets: Array<RepeatedCharInput>
  ) {
    super(1, ...charsets);
  }
}
