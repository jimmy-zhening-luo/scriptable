// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-gray;
// icon-glyph: hdd;
"use strict";
const Boot = importModule("!boot/Boot");
Boot.install();

const SystemRuntime = importModule("system/System").Runtime;
SystemRuntime.install();
