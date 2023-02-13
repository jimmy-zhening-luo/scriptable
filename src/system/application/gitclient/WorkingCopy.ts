const wc_Repository: typeof Repository = importModule("repository/Repository");

class WorkingCopy extends wc_Repository {

  static get Repository(): typeof Repository {
    return wc_Repository;
  }

}

module.exports = WorkingCopy;
