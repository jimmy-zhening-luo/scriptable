class SchemeValidator extends StringValidator {
  constructor(scheme: string) {
    super(
      scheme,
      {
        toLower: true,
        trimTrailing: [
          UrlCharSet.slash,
          UrlCharSet.colon
        ]
      },
      UrlCharSet.alphaNumericLower,
      UrlCharSet.plus,
      UrlCharSet.dot,
      UrlCharSet.hyphen
    );
  }
}
