export const SELECTOR = "'",
OPERATORS = "-+([#%$~=<>",
MATH = "x",
TRANSLATE = "q",
FALLBACK = [
  "g",
  "q",
  "x",
],
alias = {
  chat: "g",
  translate: "q",
},
engines = {
  a: { find: "Amazon" },
  g: { shortcut: "Chat" },
  q: { shortcut: "Translate" },
  x: "https://example.com/x?q=%s",
  xmulti: [
    "https://example.com/x?1=%s",
    "https://example.com/x?2=%s",
  ],
};
