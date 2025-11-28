export default class {
  constructor(
    public readonly calendars = [] as string[],
    public readonly primary = true,
  ) {}

  public async events(
    start: Date,
    end: Date,
    limit?: number,
    reverse = false,
    allDay = false,
  ) {
    const events = await CalendarEvent.between(
      from,
      to,
      (this.subscription ??= this.subscribe),
    ),
    filtered = allDay
      ? events
      : events.filter(
          ({ isAllDay }) => !isAllDay,
        );

    return limit === undefined
      || limit >= filtered.length
      ? filtered
      : limit
        ? reverse
          ? filtered.slice(-limit)
          : filtered.slice(0, limit)
        : [];
  }

  public async next(
    start: Date,
    end: Date,
    allDay?: boolean,
  ) {
    return (
      await this.events(
        start,
        end,
        1,
        false,
        allDay,
      )
    )[0];
  }

  public async last(
    start: Date,
    end: Date,
    allDay?: boolean,
  ) {
    return (
      await this.events(
        start,
        end,
        1,
        true,
        allDay,
      )
    )[0];
  }

  private async subscribe() {
    const calendars ??= calendars
      ? await Promise.all(
          calendars.map(
            async (calendar) => await Calendar.forEventsByTitle(calendar),
          ),
        )
      : [];

    if (primary)
      calendars[calendars.length] = await Calendar.defaultForEvents();

    return calendars;
  }

  private subscription?: Calendar[];
}
