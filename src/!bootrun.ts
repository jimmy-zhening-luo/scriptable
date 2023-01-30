// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-gray;
// icon-glyph: hdd;
import type { Installer } from "./!boot/Boot";
const installer: typeof Installer = importModule("!boot/Boot");
installer.install();
