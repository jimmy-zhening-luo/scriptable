class Repositories {

  static get WorkingCopy(): typeof WorkingCopy {
    return importModule("WorkingCopy");
  }

  static get Repository(): typeof Repository {
    return Repositories.WorkingCopy.Repository;
  }

}

module.exports = Repositories;
