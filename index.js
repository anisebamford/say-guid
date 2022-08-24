const tokenList = require("./babbab");

function formatEncoded(encodedTokenList) {
    return encodedTokenList.reduce((acc, val, idx) => {
        return acc + val + ([2, 4, 6, 8].includes(idx) ? "-" : "")
    }, "")
}

function formatDecoded(decodedTokenList) {
    return decodedTokenList.reduce((acc, val, idx) => {
        return acc + val + ([7, 11, 15, 19].includes(idx) ? "-" : "")
    }, "");
}

const size = BigInt(tokenList.length);

const dashMatcherShape = /-/g
const stripFormatting = word => word.replace(dashMatcherShape, "")
const splitTokenShape = /.{1,3}/g

function encode(guid) {
    guid = stripFormatting(guid);
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
    return formatEncoded(encodedTokenList);
}

function decode(word) {
    word = stripFormatting(word)
    let decodedTokenList = word
        .match(splitTokenShape);

    decodedTokenList = decodedTokenList.map(i => {
        const found = BigInt(tokenList.indexOf(i))
        if (found === -1n) {
            throw new Error(`Word ${i} not found in word list`)
        }
        return found
    })
        .reduce((acc, val) => acc * size + val, 0n)
        .toString(16)
        .split("");

    while (decodedTokenList.length < 32) {
        decodedTokenList.unshift(0);
    }

    return formatDecoded(decodedTokenList)
}

module.exports = {
    encode,
    decode
}
