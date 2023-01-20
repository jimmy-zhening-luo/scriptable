class Host {
  
}

class IPHost extends Host {
  
}

class IPv4Host extends IPHost {
  #ip = new Array()
  constructor (
    part1,
    part2,
    part3,
    part4
  ) {
    
  }
  
  get ip() {
    
  }
  
  get isIp() {
    return this.ip
      this.constructor.isIpPart()
    );
  }
  
  static fromString(host = String()) {
    
  }
  
  static isIpPart(part = String()) {
    return part?.constructor === String
    && part.trim() !== String()
    && !isNaN(+(part?.trim()));
  }
  
  static parse(host = String()) {
    host = host?.constructor === String?
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
}

class IPv6Host extends IPHost {
  
}

class RegNameHost extends Host {
  
}
