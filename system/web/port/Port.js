"use strict";
class Port {
  #portString = String();
  constructor(
    port = Number()
      ?? new this()
      ?? String()
  ) {
    port = port ?? null;
    if (port?.constructor === String) {
      const portStrToNum = Number
        .parseInt(
          port.trim(),
          10
        );
      port = Number.isNaN(portStrToNum)?
        Number()
        :portStrToNum;
    }
    port = (port?.constructor === Number)?
      port
      :null;
    port = (port > 0)?
      port
      :null;
  }
}

module.exports = Port;
