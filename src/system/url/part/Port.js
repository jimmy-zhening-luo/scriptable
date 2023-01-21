"use strict";
class Port {
  #portString = String();
  constructor(
    port = Number()
      ?? String()
      ?? new this()
  ) {
    this.port = port;
  }
  
  get port() {
    return this.#portString
      ?? String();
  }
  
  set port(
    port = Number()
      ?? String()
      ?? new this.constructor()
  ) {
    this.#portString = this
      .constructor
      .parsePort(
        port
      )
      ?? String();
  }
  
  get string() {
    return this.port
      ?? String();
  }
  
  get portNumber() {
    return this
      .constructor
      .parsePortNumberFromString(
        this.string
      )
      ?? Number();
  }
  
  get number() {
    return this.portNumber
      ?? Number();
  }
  
  toString() {
    return this.string ?? String();
  }
  
  toNumber(nullIfEmpty = false) {
    const emptyValue = (
      nullIfEmpty === true
    )?
      null
      :Number();
    return (this.number === Number())?
      emptyValue
      :this.number;
  }
  
  static parsePort(
    port = Number()
      ?? String()
      ?? new this()
  ) {
    port = port ?? String();
    if (port?.constructor === String)
      port = this
        .parsePortNumberFromString(
          port
      )
      ?? Number();
    else if (
      port
      ?.portNumber
      ?.constructor === Number
    )
      port = port
        .portNumber
        ?? Number();
    else if (
      port
      ?.constructor !== Number
    )
      port = Number();
    
    return this
    .parsePortStringFromNumber(
      port
    )
    ?? String();
  }
  
  static parsePortNumberFromString(
    port = String()
  ) {
    port = (port?.constructor === String)?
      port.trim()
      :String();
    while (port.startsWith(":"))
      port = port.slice(1);
    const parsedPort = Number
      .parseInt(
        port.trim(),
        10
      );
    return Number
      .isNaN(
        parsedPort
      )?
        Number()
        :(
          parsedPort >= 1
          && parsedPort < 65536
        )?
          Math.trunc(parsedPort)
          :Number();
  }
  
  static parsePortStringFromNumber(
    port = Number()
  ) {
    port = (
      port?.constructor === Number
      && !Number.isNan(port)
    )?
      Math.trunc(port)
      :Number();
    
    return (
      parsedPort >= 1
      && parsedPort < 65536
    )?
      String(Math.trunc(parsedPort))
        ?.trim()
        ?? String()
      :String();
  }
}

module.exports = Port;
