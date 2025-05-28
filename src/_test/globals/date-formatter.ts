const MockDateFormatter = class DateFormatter {
  public dateFormat = "MOCK_DATEFORMATTER_DEFAULT_PARAMETER_DATEFORMATSTRING";

  public string(
    date: Date,
  ) {
    return String(
      date.getTime(),
    );
  }
} as typeof DateFormatter;

export { MockDateFormatter };
