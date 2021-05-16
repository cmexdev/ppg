const https = require('https')
const fs = require('fs')

const data = []

https.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', (res) => {
    console.log(res.statusCode)

    res.on('data', (d) => {
        data.push(d)
    })
}).on('error', (e) => {
    console.log('error')
}).on('close', () => {
    let joined = data.join('')
    fs.writeFileSync('alpha.txt', joined)
})