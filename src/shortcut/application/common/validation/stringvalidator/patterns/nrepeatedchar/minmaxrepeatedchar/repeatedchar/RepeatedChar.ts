abstract class RepeatedChar {
  readonly charset: CharSet;
  constructor(
    ...charsets: Array<RepeatedChar.RepeatedCharInput>
  ) {
    const chars: Array<string> = [];
    charsets.forEach(
      (charset) => {
        if (charset instanceof RepeatedChar)
          chars.push(...charset.charset.chars);
        else if (charset instanceof CharSet)
          chars.push(...charset.chars);
        else if (Array.isArray(charset))
          chars.push(...charset);
        else
          chars.push(charset);
      }
    );
    this.charset = new CharSet(chars);
  }

  abstract match(token: string): boolean;
}

namespace RepeatedChar {
  export type RepeatedCharInput = RepeatedChar
    | CharSet.CharSetInput;
}
