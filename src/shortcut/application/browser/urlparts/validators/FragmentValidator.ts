 class FragmentValidator extends StringValidator {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          UrlCharSet.hash,
          UrlCharSet.space
        ]
      }
    );
  }
}
