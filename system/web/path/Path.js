"use strict";
const PathPart = importModule("PathPart");

class Path {
  #parts = new Array(new PathPart());
}

module.exports = Path;
module.exports.PathPart = PathPart;
