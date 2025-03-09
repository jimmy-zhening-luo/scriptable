const SyntheticDateFormatter = class SyntheticDateFormatter {
  public dateFormat = "SYNTHETIC_DATEFORMATTER_DEFAULT_PARAMETER_DATEFORMATSTRING";

  public string(date: Date) {
    return String(date.getTime());
  }
} as typeof DateFormatter;

export { SyntheticDateFormatter };
