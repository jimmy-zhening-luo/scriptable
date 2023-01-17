// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
class Boot {
  static boot() {
    const Loader = importModule("boot/loader");
    Loader.bootstrap();
  }
}

Boot.boot();

module.exports = Boot;
module.exports.Boot = Boot;
