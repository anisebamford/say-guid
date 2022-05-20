const {encode, decode} = require("./index.js")

const guid = "a634cdd3-a50e-4383-bfa5-cc37fd126194"
const encoded = encode(guid);
const decoded = decode(encoded);
if (decoded !== guid) {
  throw new Error(`I was expecting ${guid}, but I got ${decoded}. What the hay?`)
}

