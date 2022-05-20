const {encode, decode} = require("./index.js");
const {exit} = require("process")

const [err, report] = ((f,m) => {
  return [
    (it, message) => {
      if (!(it in m)) {
        m[it] = [];
      }
      f = true;
      m[it].push(message);
    },
    () => {
      if (f) Object.keys(m).forEach(k => {
        console.error(k);
        console.error("-----------------")
        m[k].forEach((x) => console.error(x));
      });
      if (f) exit(1);
    }
  ]
})(false,{});

((it) => {
  const guid = "a634cdd3-a50e-4383-bfa5-cc37fd126194";
  const encoded = encode(guid);
  const decoded = decode(encoded);
  if (decoded !== guid) {
    err(it, `I was expecting ${guid}, but I got ${decoded}. What the hay?`);
  }
})("It should encode and decode symmetrically");

((it) => {
  const guid = "ffffffff-ffff-ffff-ffff-ffffffffffff"
  const encoded = encode(guid);
  if (encoded.length > 40) {
    err(it, "Too many syllables in the encoded string");
  }
})("It should have enough syllables to encode every guid in 39 characters");

((it) => {
  const guid = "00000000-0000-0000-0000-000000000000"
  const babbab= "babbabbab-babbab-babbab-babbabbab"
  if (encode(guid) !== babbab) {
    err(it, "Encoding failed to pad the result")
  }
  if (decode(babbab) !== guid) {
    err(it, "Decoding failed to pad the result")
  }
})("It should pad the start of small numbers");

report()
