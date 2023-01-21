// WIP
"use strict";
const IP = importModule("host/IP");
const IPv4 = importModule("host/IPv4");
const IPv6 = importModule("host/IPv6");
const RegName = importModule(
  "host/RegName"
);

class Host {
  #host = undefined;
  constructor(
    host = String()
      ?? new this()
      ?? new IP()
      ?? new RegName()
  ) {
    this.#host = parseHost(host)
      ?? null;
  }
  
  get host() {
    return this.#host ?? String();
  }
  
  get string() {
    return this.host ?? String();
  }
  
  toString() {
    return this.host ?? String();
  }
  
  static parseHost(
    host = String()
  ) {
    return this.parseIP(host)
    ?? this.parseRegName(host)
    ?? null;
  }
  
  static parseIP(
    host = String()
  ) {
    return this.parseIPv4(host)
    ?? this.parseIPv6(host)
    ?? null;
  }
  
  static parseIPv4(
    host = String()
  ) {
    const ip = new IPv4(host) ?? null;
    return (
      (
        ip
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(ip ?? null)
  }
  
  static parseIPv6(
    host = String()
  ) {
    const ip = new IPv6(host) ?? null;
    return (
      (
        ip
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(ip ?? null)
  }
  
  static parseRegName(
    host = String()
  ) {
    const reg = new RegName(host) ?? null;
    return (
      (
        reg
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(reg ?? null)
  }
}

module.exports = Host;
