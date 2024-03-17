class Meeting {
  protected readonly event: CalendarEvent;

  constructor(
    event: CalendarEvent = new CalendarEvent(),
    duplicate: boolean = false,
    {
      overrideTitle = event.title,
      overrideLocation = event.location,
      overrideNotes = event.notes,
    }: {
      overrideTitle?: string;
      overrideLocation?: string;
      overrideNotes?: string;
    } = {},
  ) {
    try {
      if (!duplicate)
        this.event = event;
      else {
        this.event = new CalendarEvent();
        this.event.title = overrideTitle;
        this.event.location = overrideLocation;
        this.event.notes = overrideNotes;
        this.event.startDate = event.startDate;
        this.event.endDate = event.endDate;
        this.event.isAllDay = event.isAllDay;
        this.event.availability = event.availability;
        this.event.timeZone = event.timeZone;
        this.event.calendar = event.calendar;
        this.event.save();
      }
    }
    catch (e) {
      throw new ReferenceError(
        `Meeting: constructor: Error initializing CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get title(): string {
    try {
      return this.event.title;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: title: Error getting title of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get location(): string {
    try {
      return this.event.location;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: location: Error getting location of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get notes(): string {
    try {
      return this.event.notes;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: notes: Error getting notes of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get startDate(): Date {
    try {
      return this.event.startDate;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: startDate: Error getting startDate of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get endDate(): Date {
    try {
      return this.event.endDate;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: endDate: Error getting endDate of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get isAllDay(): boolean {
    try {
      return this.event.isAllDay;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: isAllDay: Error getting isAllDay of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get availability(): CalendarEvent["availability"] {
    try {
      return this.event.availability;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: availability: Error getting availability of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public get timeZone(): string {
    try {
      return this.event.timeZone;
    }
    catch (e) {
      throw new EvalError(
        `Meeting: timeZone: Error getting timeZone of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set title(title: string) {
    try {
      this.event.title = title;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: title: Error setting title of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set location(location: string) {
    try {
      this.event.location = location;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: location: Error setting location of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set notes(notes: string) {
    try {
      this.event.notes = notes;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: notes: Error setting notes of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set startDate(startDate: Date) {
    try {
      this.event.startDate = startDate;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: startDate: Error setting startDate of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set endDate(endDate: Date) {
    try {
      this.event.endDate = endDate;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: endDate: Error setting endDate of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public set availability(availability: CalendarEvent["availability"]) {
    try {
      this.event.availability = availability;
      this.event.save();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: availability: Error setting availability of CalendarEvent object: \n${e as string}`,
      );
    }
  }

  public delete(): void {
    try {
      this.event.remove();
    }
    catch (e) {
      throw new EvalError(
        `Meeting: delete: Error deleting CalendarEvent object: \n${e as string}`,
      );
    }
  }
}

module.exports = Meeting;
