class OneRepeatedChar extends NRepeatedChar {
  constructor(
    ...charsets: Array<RepeatedChar.RepeatedCharInput>
  ) {
    super(1, ...charsets);
  }
}
