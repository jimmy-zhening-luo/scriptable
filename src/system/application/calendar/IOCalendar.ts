class IOCalendar {
  protected calendar: Calendar | null;

  constructor() {
    try {
      this.calendar = null;
    }
    catch (e) {
      throw new ReferenceError(
        `CalendarHandler: constructor: Error initializing Calendar object: \n${e as string}`,
      );
    }
  }

  public static get Meeting(): typeof Meeting {
    try {
      return importModule("meeting/Meeting") as typeof Meeting;
    }
    catch (e) {
      throw new ReferenceError(
        `CalendarHandler: Meeting: Error importing Meeting module: \n${e as string}`,
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this.calendar !== null;
    }
    catch (e) {
      throw new EvalError(
        `CalendarHandler: isValid: Error checking if Calendar object is valid: \n${e as string}`,
      );
    }
  }
}

module.exports = IOCalendar;
