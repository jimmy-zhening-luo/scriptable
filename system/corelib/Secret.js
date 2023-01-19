const System = importModule("./system/System");
const File = System.File;

class Secret {
  #file = new File();
  
}

module.exports = Secret;
module.exports.Secret = Secret;