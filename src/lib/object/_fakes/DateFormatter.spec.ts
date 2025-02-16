const FakeDateFormatter = class FakeDateFormatter {
  public dateFormat = "DEFAULT DATE FORMAT";

  public string(date: Date) {
    return String(date.getTime());
  }
} as unknown as typeof DateFormatter;

export { FakeDateFormatter };
