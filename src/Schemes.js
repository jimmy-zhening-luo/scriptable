// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
const Schemes = Object.freeze({
  Apple: {
    Bear: {
      Default: {
        Scheme: "bear://",
        Base: "x-callback-url",
        Actions: {
          Archive: "/archive",
          Create: "/create",
          Search: "/search",
        }
      },
      Help: [
        "https://bear.app/faq/X-callback-url%20Scheme%20documentation/"
      ]
    }
  }
});

module.exports = Schemes;