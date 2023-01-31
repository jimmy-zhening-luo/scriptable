class RepeatedChar {
    constructor(...charsets) {
        const chars = [];
        charsets.forEach((charset) => {
            if (charset instanceof RepeatedChar)
                chars.push(...charset.charset.chars);
            else if (charset instanceof CharSet)
                chars.push(...charset.chars);
            else if (Array.isArray(charset))
                chars.push(...charset);
            else
                chars.push(charset);
        });
        this.charset = new CharSet(chars);
    }
}
//# sourceMappingURL=RepeatedChar.js.map