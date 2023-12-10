class UrlComposites {
  public static get UrlComposite(): typeof UrlComposite {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.UrlComposite;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get UrlComposite: error getting UrlComposite: \n${e as string}`,
      );
    }
  }

  public static get SchemeHostPortPathQueryFragment():
    typeof SchemeHostPortPathQueryFragment {
    try {
      return importModule(
        "SchemeHostPortPathQueryFragment",
      ) as typeof SchemeHostPortPathQueryFragment;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get SchemeHostPortPathQueryFragment: error getting SchemeHostPortPathQueryFragment: \n${e as string}`,
      );
    }
  }

  public static get SchemeHostPort(): typeof SchemeHostPort {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.SchemeHostPort;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get SchemeHostPort: error getting SchemeHostPort: \n${e as string}`,
      );
    }
  }

  public static get PathQueryFragment(): typeof PathQueryFragment {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.PathQueryFragment;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get PathQueryFragment: error getting PathQueryFragment: \n${e as string}`,
      );
    }
  }

  public static get HostPort(): typeof HostPort {
    try {
      return UrlComposites.SchemeHostPort.HostPort;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get HostPort: error getting HostPort: \n${e as string}`,
      );
    }
  }

  public static get PathQuery(): typeof PathQuery {
    try {
      return UrlComposites.PathQueryFragment.PathQuery;
    }
    catch (e) {
      throw new Error(
        `UrlComposites: get PathQuery: error getting PathQuery: \n${e as string}`,
      );
    }
  }
}

module.exports = UrlComposites;
