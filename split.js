const fs = require('fs')
const { clipboard } = require('electron')
const hsimp = require('hsimp')

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gen').value = gen()[0]

    document.getElementById('gennew').addEventListener('click', () => {
        var val = gen()
        document.getElementById('gen').value = val[0]
        clipboard.writeText(val[0])
        document.getElementById('time').textContent = 'It\'d take a computer around ' + val[1].time + ' to crack this password. You\'re all set.'
    })
})

function gen() {
    const data = fs.readFileSync('alpha.txt')
    const split = data.toString().split('\n')
    const join = split.join('')
    const words = join.split('\r')

    var threeLetters = []

    words.forEach(el => {
        if (el.length === 3) {
            threeLetters.push(el)
        }
    })

    let rn = Math.floor(Math.random() * threeLetters.length)
    var threeRandomWord = threeLetters[rn][0].toUpperCase() + threeLetters[rn].substring(1)

    let zeroThroughNine = Math.floor(Math.random() * 9)

    var fiveLetters = []

    words.forEach(el => {
        if (el.length === 5) {
            fiveLetters.push(el)
        }
    })

    let rnForFive = Math.floor(Math.random() * fiveLetters.length)
    var fiveRandomWord = fiveLetters[rnForFive][0].toUpperCase() + fiveLetters[rn].substring(1)

    const punc = [',', '.', '/', '?', ';', ':']
    let rnForPunc = Math.floor(Math.random() * punc.length)
    var randomPunc = punc[rnForPunc]

    var fourLetters = []

    words.forEach(el => {
        if (el.length === 4) {
            fourLetters.push(el)
        }
    })

    let rnForFour = Math.floor(Math.random() * fourLetters.length)
    var fourRandomWord = fourLetters[rnForFour][0].toUpperCase() + fourLetters[rn].substring(1)

    const password = threeRandomWord + zeroThroughNine + fiveRandomWord + randomPunc + fourRandomWord
    return [password, hsimp(password)]
}