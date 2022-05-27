#! /usr/bin/env node

const {encode} = require("./")
const process = require("process")

if (process.argv[2] !== undefined) {
  console.log(encode(process.argv[2]))
  process.exit(0)
}

const self = process.stdin
let data = "";

self.on("readable", function() {
  const chunk = this.read();
  if (/[\-a-f\d]/.test("" + chunk)) {
    data += chunk
  }
})
self.on("end", () => {
  console.log(encode(data))
})
