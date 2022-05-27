const sayGuid = require("./index.js");
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
  const {encode, decode} = sayGuid.babbab();
  const guid = "a634cdd3-a50e-4383-bfa5-cc37fd126194";
  const encoded = encode(guid);
  const decoded = decode(encoded);
  if (decoded !== guid) {
    fail(it, `I was expecting ${guid}, but I got ${decoded}. What the hay?`);
  }
})("It should encode and decode symmetrically");

((it) => {
  const {encode} = sayGuid.babbab();
  const guid = "ffffffff-ffff-ffff-ffff-ffffffffffff"
  const encoded = encode(guid);
  if (encoded.length > 40) {
    fail(it, "Too many syllables in the encoded string");
  }
})("It should have enough syllables to encode every guid in 40 characters");

((it) => {
  const {encode, decode} = sayGuid.babbab()
  const guid = "00000000-0000-0000-0000-000000000000"
  const babbab = "babbabbab-babbab-babbab-babbab-babbabbab"
  if (encode(guid) !== babbab) {
    fail(it, "Encoding failed to pad the result")
  }
  if (decode(babbab) !== guid) {
    fail(it, "Decoding failed to pad the result")
  }
})("It should pad the start of small numbers");

((it) => {
  const wordList = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-~".split("");
  const guid = "a634cdd3-a50e-4383-bfa5-cc37fd126194";
  const {encode, decode} = sayGuid.sayGuid(wordList, 1, (list) => list.join("-"), (list) => list.join("-"));
  if (encode(guid) !== "1-U-W-4-5-6-J-F-m-3-v-y-Y-_-V-F-c-T-S-E-k-h") {
    fail(it, "Failed to encode with custom settings")
  }
  if (decode(encode(guid)) !== guid.replace(/-/g, "").split("").join("-")) {
    fail(it, "Failed to decode with custom settings");
  }

})("It should accept alternate word lists");

report()
