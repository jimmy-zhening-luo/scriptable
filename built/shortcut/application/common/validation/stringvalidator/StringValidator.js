class StringValidator {
    constructor(text, { toLower = false, trim = true, trimLeading = [], trimTrailing = [] }, ...allowedChars) {
        this.raw = text;
        this.allowedChars = this
            .parseStringValidatorInput(...allowedChars);
        this.cleaned = this
            .clean(text, toLower, trim, trimLeading, trimTrailing);
    }
    parseStringValidatorInput(...allowedCharsInput) {
        const parsedPatterns = [];
        allowedCharsInput.forEach((input) => {
            if (input instanceof StringValidator)
                parsedPatterns.push(...input.allowedChars);
            else if (input instanceof OneRepeatedChar)
                parsedPatterns.push(input);
            else
                parsedPatterns.push(new OneRepeatedChar(input));
        });
        return parsedPatterns;
    }
    clean(text, toLower, trim, trimLeading, trimTrailing) {
        return postTrim(preTrim(trim ?
            toLower ?
                text.toLowerCase().trim()
                : text.trim()
            : toLower ?
                text.toLowerCase()
                : text, trimLeading), trimTrailing);
        function preTrim(text, wordsToTrim) {
            wordsToTrim
                .filter((word) => (word.length > 0))
                .forEach((word) => {
                while (text.startsWith(word))
                    text = text.slice(word.length);
            });
            return text;
        }
        function postTrim(text, wordsToTrim) {
            wordsToTrim
                .filter((word) => (word.length > 0))
                .forEach((word) => {
                while (text.endsWith(word))
                    text = text.slice(0, 0 - word.length);
            });
            return text;
        }
    }
    get validated() {
        return this.isValid ?
            this.cleaned
            : String();
    }
    get isValid() {
        return this.oneGrams.every((oneGram) => (this.allowedChars.some((oneRepeatedChar) => (oneRepeatedChar.match(oneGram.word)))));
    }
    get oneGrams() {
        return splitStringIntoOneGrams(this.cleaned);
        function splitStringIntoOneGrams(text) {
            return [...text]
                .map((char) => (new OneGram(char)));
        }
    }
}
//# sourceMappingURL=StringValidator.js.map