export class DateFormatter {
  public dateFormat = "MOCK_DATEFORMATTER_DEFAULT_DATEFORMAT";
  public locale = "MOCK_DATEFORMATTER_DEFAULT_LOCALE";

  public string(date: Date) {
    return String(date.getTime());
  }

  public date(str: string) {
    return new Date(str);
  }

  public useNoDateStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_NO_DATE";
  }

  public useShortDateStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_SHORT_DATE";
  }

  public useMediumDateStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_MEDIUM_DATE";
  }

  public useLongDateStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_LONG_DATE";
  }

  public useFullDateStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_FULL_DATE";
  }

  public useNoTimeStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_NO_TIME";
  }

  public useShortTimeStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_SHORT_TIME";
  }

  public useMediumTimeStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_MEDIUM_TIME";
  }

  public useLongTimeStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_LONG_TIME";
  }

  public useFullTimeStyle(): void {
    this.dateFormat = "MOCK_DATEFORMATTER_DATEFORMAT_FULL_TIME";
  }
}
