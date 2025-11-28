export default class {
  constructor(
    public readonly calendars = [] as string[],
    public readonly primary = true,
  ) {}

  public async events(
    from: Date,
    to: Date,
    limit?: number,
    reverse = false,
    allDay = false,
  ) {
    this.subscription ||= await this.subscribe();

    const events = await CalendarEvent.between(
      from,
      to,
      this.subscription,
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
    from: Date,
    to: Date,
    allDay?: boolean,
  ) {
    return (
      await this.events(
        from,
        to,
        1,
        false,
        allDay,
      )
    )[0];
  }

  public async last(
    from: Date,
    to: Date,
    allDay?: boolean,
  ) {
    return (
      await this.events(
        from,
        to,
        1,
        true,
        allDay,
      )
    )[0];
  }

  private async subscribe() {
    const calendars = this.calendars.length
      ? await Promise.all(
          this.calendars.map(
            async calendar => Calendar.forEventsByTitle(calendar),
          ),
        )
      : [];

    if (this.primary)
      calendars[calendars.length] = await Calendar.defaultForEvents();

    return calendars;
  }

  private subscription?: Calendar[];
}
