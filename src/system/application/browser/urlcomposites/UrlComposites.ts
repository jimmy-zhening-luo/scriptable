class UrlComposites {
  static get UrlComposite(): typeof UrlComposite {
    return importModule("urlcomposite/UrlComposite");
  }

  static get SchemeHostPortPathQueryFragment(): typeof SchemeHostPortPathQueryFragment {
    return importModule("SchemeHostPortPathQueryFragment");
  }

  static get SchemeHostPort(): typeof SchemeHostPort {
    return UrlComposites.SchemeHostPortPathQueryFragment.SchemeHostPort;
  }

  static get PathQueryFragment(): typeof PathQueryFragment {
    return UrlComposites.SchemeHostPortPathQueryFragment.PathQueryFragment;
  }

  static get HostPort(): typeof HostPort {
    return UrlComposites.SchemeHostPort.HostPort;
  }

  static get PathQuery(): typeof PathQuery {
    return UrlComposites.PathQueryFragment.PathQuery;
  }
}

module.exports = UrlComposites;
