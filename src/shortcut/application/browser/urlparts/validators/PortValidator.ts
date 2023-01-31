class PortValidator extends StringValidator {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          UrlCharSet.colon,
          UrlCharSet.space
        ]
      },
      UrlCharSet.numbers
    );
  }
}
