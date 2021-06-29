//Generate a password following:
//  Pox6Twain!Lord7
//However, this time, make sure they're actual words.
//Also, no words with 's

const hsimp = require('hsimp')
const fs = require('fs')
const dec = new TextDecoder()

let buffer = fs.readFileSync('dictionary.json')
let decoded = dec.decode(buffer)
const dictionary = JSON.parse(decoded)
const wordsRaw = fs.readFileSync('words.txt')
const words = wordsRaw.toString().split('\n')

//Return definition of argument
function define(word) {
    return dictionary[word.toString().toUpperCase()]
}

//Find all words with lenght of 'num'
//But also hide any words with 's
function getWordOfLength(num) {
    let wordsOfLength = []
    words.forEach(word => {
        if (word.length === num) {
            //Remove words with 's
            if (word.indexOf('\'s') === -1) {
                wordsOfLength.push(word)
            }
        }
    })
    return wordsOfLength
}

//Get a random element from provided array
function getRandomFromArray(array) {
    let len = array.length
    let rn = Math.floor(Math.random() * len)
    return array[rn]
}

//Capatilize first letter of word
function capIt(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

//Check to see if entire word is uppercase
function isUpperCase(word) {
    return /^[A-Z]*$/.test(word)
}

//Probably a stupid way to run tests, but it works.
function gen() {
    let characters = [',', '.', '/', '?', ';', ':', '-', '=', '+', '!']
    let three = capIt(getRandomFromArray(getWordOfLength(3)))
    //For each word in the password, check to see if it's all uppercase.
    //  If so, start over.
    //Then check to see if it has a definition or is an actual word.
    //  If not, start over.
    if (isUpperCase(three) !== true) {
        if (define(three) !== undefined) {
            let randomNumber = Math.floor(Math.random() * 10)
            let five = capIt(getRandomFromArray(getWordOfLength(5)))
            if (isUpperCase(five) !== true) {
                if (define(five) !== undefined) {
                    let character = getRandomFromArray(characters)
                    let four = capIt(getRandomFromArray(getWordOfLength(4)))
                    if (isUpperCase(four) !== true) {
                        if (define(four) !== undefined) {
                            let finalRandomNumber = Math.floor(Math.random() * 10)
                            let final = three + randomNumber + five + character + four + finalRandomNumber
                            //Test password according to HSIMP
                            //  If it has a level value, start over
                            //  Generally, the level value should only have a value when it's a bad password.
                            //Maybe add a system that checks the password against the top 10,000 passwords.
                            //  If it does find a match, start over.
                            let hsimpTest = hsimp(final)
                            if (hsimpTest.level === null) {
                                return final
                            } else {
                                return gen()
                            }
                        } else {
                            return gen()
                        }
                    } else {
                        return gen()
                    }
                } else {
                    return gen()
                }
            } else {
                return gen()
            }
        } else {
            return gen()
        }
    } else {
        return gen()
    }
}

//Export module
exports.gen = gen