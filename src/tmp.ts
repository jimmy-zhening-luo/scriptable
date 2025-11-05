
    [firstTomorrow] = laterToday === undefined
      ? (
          await CalendarEvent.between(
            tomorrow.date(),
            (
              now < now.at(22)
                ? now.in(26)
                : tomorrow.eod
            )
              .date(),
            [calendar],
          )
        )
          .filter(event => !event.isAllDay)
      : [undefined],
    [soonest] = laterToday === undefined
      && firstTomorrow === undefined
      ? (
          await CalendarEvent.between(
            tomorrow.date(),
            now
              .in(24 * 31)
              .date(),
            [calendar],
          )
        )
          .filter(event => !event.isAllDay)
      : [undefined],
