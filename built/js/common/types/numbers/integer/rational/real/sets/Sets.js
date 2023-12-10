"use strict";
class Sets {
    static get Bounds() {
        try {
            return {
                Finite: importModule("Finite"),
                Infinite: importModule("Infinite"),
            };
        }
        catch (e) {
            throw new ReferenceError("Sets: error importing Finite or Infinite module");
        }
    }
    static get Cardinality() {
        try {
            return {
                AnyCardinality: importModule("AnyCardinality"),
                Positive: importModule("Positive"),
                Negative: importModule("Negative"),
            };
        }
        catch (e) {
            throw new ReferenceError("Sets: error importing AnyCardinality, Positive, or Negative module");
        }
    }
    static get Base() {
        try {
            return {
                Bounds: Sets.Bounds.Infinite.Bounds,
                Cardinality: Sets.Cardinality.AnyCardinality.Cardinality,
            };
        }
        catch (e) {
            throw new ReferenceError("Sets: error importing Bounds or Cardinality module");
        }
    }
}
module.exports = Sets;
