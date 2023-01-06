// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
const baseUrl = [
  "foo.com",
  "/path",
  "/path2",
  "?a=b&c=d"
].join("");

console.log(baseUrl);

let cu = new CallbackURL(baseUrl);

cu.addParameter("joe", "foo.com/vingus?shxh=10");

const cuStr = cu.getURL();

console.log(cuStr);

let gu = String();

console.log("Empty string: " + gu);