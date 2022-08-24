const {encode, decode} = require("./index.js");
const {exit} = require("process")

const [fail, report] = ((fail, messages, error) => {
  return [
    (it, message) => {
      if (!(it in messages)) {
        messages[it] = [];
      }
      fail = 1;
      messages[it].push(message);
    },
    () => {
      for(it in messages) {
        error(it);
        error("-".repeat(20));
        messages[it].forEach((message) => error(message));
        error("\n\n");
      }
      if (!fail) {
        console.log("All tests pass.")
      }
      exit(fail);
    }
  ]
})(0, {}, console.error);

((it) => {
  const guid = "a634cdd3-a50e-4383-bfa5-cc37fd126194";
  const encoded = encode(guid);
  const decoded = decode(encoded);
  if (decoded !== guid) {
    fail(it, `I was expecting ${guid}, but I got ${decoded}. What the hay?`);
  }
})("It should encode and decode symmetrically");

((it) => {
  const guid = "ffffffff-ffff-ffff-ffff-ffffffffffff"
  const encoded = encode(guid);
  if (encoded.length > 40) {
    fail(it, "Too many syllables in the encoded string");
  }
})("It should have enough syllables to encode every guid in 40 characters");

((it) => {
  const guid = "00000000-0000-0000-0000-000000000000"
  const babbab = "babbabbab-babbab-babbab-babbab-babbabbab"
  if (encode(guid) !== babbab) {
    fail(it, "Encoding failed to pad the result")
  }
  if (decode(babbab) !== guid) {
    fail(it, "Decoding failed to pad the result")
  }
})("It should pad the start of small numbers");


report()
