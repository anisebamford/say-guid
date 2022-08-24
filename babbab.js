function decodeWordList(wordList) {
    const lines = wordList.split('\n')
    const words = [];
    for (const line of lines) {
        const prefix = line.slice(0, 2)
        const suffixes = line.slice(2).split("")
        for (const suffix of suffixes) {
            words.push(prefix+suffix)
        }
    }
    return words
}

const compressedWordList = `babdfghjklmnprstvwxyz
bebdfghjklmnprstvxez
bibdfghjklmnprstvwxyz
bobdfghjklmnoprstvxyz
bubdfghjklmnprstvxyz
dabdfghjklmnprstvwxyz
debdfghjklmnprstvxz
dibdfghjlmnprstvxyz
dobdfghjklmnprstvxyz
dubdfghjklmnoprstvxyz
fabdfhjklmnrstvwxyz
febdfghjklmnprstvxez
fibdfghjklmnpstvwxyz
fobdfghjklmnoprstvxyz
fubdfghjlmnprstvyz
gabdfghjklmnprstvwxz
gebdfghjkmnprstvxz
gibdghjklmnrstvwxyz
gobdfghjklmnoprstvxyz
gubdfghjklmnprstvxyz
habdfghjklmnprstvwxyz
hebdfghjklmnprstvxez
hibdfghjklmnprstvwxyz
hobdfghjklmnoprstvxyz
hubdfghjklmnprstvxyz
jabdfghjklmnrstvwxyz
jebdfghjklmnprstvxez
jibdghjklmnprstvxy
jobdfghjklmnprstvxyz
jubdfghjklmnprstvxyz
kabdfghjklmnprstvwxyz
kebdfghjklmnprstvxyz
kibdfghjklmnprstvwxyz
kobdfghjlmnoprstvyz
kubdfghjlnprstvyz
labdfghjklmnprstvwxyz
lebdfghjklmnprstvxe
libdfghjklmnprstvwxyz
lobdfghjklmnoprstvxyz
lubdfghjklmnprstvxyz
mabdfghjklmnprstvwxyz
mebdfghjklmnprstvxez
mibdfghjklmnprstvwxyz
mobdfghjklmnoprstvxyz
mubdghjklmnprstvxyz
nabdfghjklmnprstvwxyz
nebdfghjklmnprstvxez
nibdfhjklmnrstvwxyz
nodfghjklmnoprstvxyz
nubdfghjklmnprsvxyz
pabdfghjklmnprstvwxyz
pebdfghjklmprstvxz
pibdfghjklmprtvwxyz
pobdfghjklmnoprstvxyz
pubdfghjklmnprstvxyz
rabdfghjklmnprstvwxyz
rebdfghjklmnprstvxez
ribdfghjklmnprstvwxyz
robdfghjklmnoprstvxyz
rubdfghjklmnprstvxyz
sabdfghjklmnprstvwxyz
sebdfghjklmnprstvez
sibdfghjklmnprstvwxyz
sobdfghjklmnoprstvxyz
subdfghjklmnprstvxyz
tabdfghjklmnprstvwxyz
tebdfghjklmnprstvxez
tibdfghjklmnprsvwxyz
tobdfghjklmnoprstvxyz
tubdfghjklmnrstvxyz
vabdfhklmnprstvwxyz
vebdfghjklmnprstvxez
vibdfghjklmnprstvwxyz
vobdfghjklmnoprstvxyz
vubdefghjklmnprstvxyz
wabdfghjklmnprstvwxyz
webdfghjklmnprstvxez
wibdfghjklmnprstvwxyz
wobdfghjklmnoprstvxyz
wubdfghjklmnprstvxyz
yabdfghjklmnprstvwxyz
yebdfghjklmnprstvxez
yibdfghjklmnprstvwxyz
yobdfghjklmnoprstvxyz
yubdfghjklmnprstvuxyz
zabdfghjklmnprstvwxyz
zebdefghjklmnprstvxz
zibdfghjklmnprstvwxyz
zobdfghjklmnoprstvxyz
zubdfghjklmnprstvxyz`

module.exports = decodeWordList(compressedWordList)
