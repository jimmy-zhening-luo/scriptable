export default {
  key: "foo" as stringful,
  terms: ["items", "near", "me"] as stringful[],
  natural: "items near me",
  engine: { find: "Tester" },
  toString() {
    return `${this.key} ${this.natural}` as stringful;
  },
} as const;
