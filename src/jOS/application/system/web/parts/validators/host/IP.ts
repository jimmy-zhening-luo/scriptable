abstract class _IP {

}

class _IPv4 extends _IP {
  /*
  #ip = new Array()
  constructor(
    part1,
    part2,
    part3,
    part4
  ) {

  }

  get ip() {

  }

  get isIp() {

  }

  static fromString(host = String()) {

  }

  static isIpPart(part = String()) {
    return part?.constructor === String
      && part.trim() !== String()
      && !isNaN(+(part?.trim()));
  }

  static parse(host = String()) {
    host = host?.constructor === String ?
      host.trim() : String();

    const parts = host
      .split(".")
      .filter((part) => (
        part?.constructor === String
        && part.trim() !== String()
      )).map((part) => (
        part.trim()
      ));

    if (parts.length === 4) {

    } else {
      return false;
    }
      && (parts[3].split(":")
      &&
        )
      && parts.slice(0, 3)
  }
  */
}

class _IPv6 extends _IP {

}



module.exports = _IP;
module.exports.IP = _IP;
module.exports.IPv4 = _IPv4;
module.exports.IPv6 = _IPv6;
