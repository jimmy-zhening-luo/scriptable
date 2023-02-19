class Repositories {

  static get WorkingCopy(): typeof WorkingCopy {
    return importModule("WorkingCopy");
  }

  static get Repository(): typeof Repository {
    return Repositories.WorkingCopy.Repository;
  }

  static get Common(): typeof Common {
    return importModule("./common/Common");
  }

}

module.exports = Repositories;
