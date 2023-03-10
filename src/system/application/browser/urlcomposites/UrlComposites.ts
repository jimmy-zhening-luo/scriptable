class UrlComposites {
  static get UrlComposite(): typeof UrlComposite {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.UrlComposite;
    } catch (e) {
      throw new Error(
        `UrlComposites: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }

  static get SchemeHostPortPathQueryFragment(): typeof SchemeHostPortPathQueryFragment {
    try {
      return importModule("SchemeHostPortPathQueryFragment");
    } catch (e) {
      throw new Error(
        `UrlComposites: get SchemeHostPortPathQueryFragment: error getting SchemeHostPortPathQueryFragment: ${e}`,
      );
    }
  }

  static get SchemeHostPort(): typeof SchemeHostPort {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.SchemeHostPort;
    } catch (e) {
      throw new Error(
        `UrlComposites: get SchemeHostPort: error getting SchemeHostPort: ${e}`,
      );
    }
  }

  static get PathQueryFragment(): typeof PathQueryFragment {
    try {
      return UrlComposites.SchemeHostPortPathQueryFragment.PathQueryFragment;
    } catch (e) {
      throw new Error(
        `UrlComposites: get PathQueryFragment: error getting PathQueryFragment: ${e}`,
      );
    }
  }

  static get HostPort(): typeof HostPort {
    try {
      return UrlComposites.SchemeHostPort.HostPort;
    } catch (e) {
      throw new Error(
        `UrlComposites: get HostPort: error getting HostPort: ${e}`,
      );
    }
  }

  static get PathQuery(): typeof PathQuery {
    try {
      return UrlComposites.PathQueryFragment.PathQuery;
    } catch (e) {
      throw new Error(
        `UrlComposites: get PathQuery: error getting PathQuery: ${e}`,
      );
    }
  }
}

module.exports = UrlComposites;
