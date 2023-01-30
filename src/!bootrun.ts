// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-gray;
// icon-glyph: hdd;
namespace bootrun {
  export const Installer = importModule("!boot/Boot");
}

bootrun.Installer.install();
