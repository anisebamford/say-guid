function defaultFormatEncoded(encodedTokenList) {
    return encodedTokenList.reduce((acc, val, idx) => {
        return acc + val + ([2, 4, 6, 8].includes(idx) ? "-" : "")
    }, "")
}

function defaultFormatDecoded(decodedTokenList) {
    return decodedTokenList.reduce((acc, val, idx) => {
        return acc + val + ([7, 11, 15, 19].includes(idx) ? "-" : "")
    }, "");
}

const sayGuidFactory = (tokenList, tokenLength, formatEncodedTokenList = defaultFormatEncoded, formatDecodedTokenList = defaultFormatDecoded) => {
    const size = BigInt(tokenList.length);
    
    function encode(guid) {
        guid = guid.replace(/-/g, "");
        const encodedTokenList = [];
        let value = BigInt("0x" + guid);
        
        while (value >= size) {
            const tokenValue = value % size;
            value = value / size;
            encodedTokenList.unshift(tokenList[Number(tokenValue)]);
        }
        
        encodedTokenList.unshift(tokenList[Number(value)]);

        while(encodedTokenList.length < 12) {
            encodedTokenList.unshift(tokenList[0])
        }
        return formatEncodedTokenList(encodedTokenList);
    }
    
    function decode(word) {
        const decodedTokenList = word
            .replace(/-/g, "")
            .match(new RegExp(`.{1,${tokenLength}}`, "g"))
            .map(i => BigInt(tokenList.indexOf(i)))
            .reduce((acc, val) => acc * size + val, 0n)
            .toString(16)
            .split("");

        while (decodedTokenList.length < 32) {
            decodedTokenList.unshift(0);
        }

        return formatDecodedTokenList(decodedTokenList)
    }

    return {encode, decode}
}

function babbab() {
    const wordList = require("./tokenList.json");
    return sayGuidFactory(wordList, 3);
}

function base64url() {
  const wordList = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("")
  return sayGuidFactory(wordList, 1);
}

module.exports = {
    sayGuid: sayGuidFactory,
    babbab,
    base64url,
}

