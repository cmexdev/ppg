const fs = require('fs')
const { clipboard } = require('electron')
const hsimp = require('hsimp')
const gen = require('./generatePassword')

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gen').value = gen.gen()

    document.getElementById('gennew').addEventListener('click', () => {
        var val = gen.gen()
        document.getElementById('gen').value = val
        document.getElementById('time').textContent = 'It\'d take a computer around ' + hsimp(val).time + ' to crack this password. You\'re all set.'
    })

    document.getElementById('gencopy').addEventListener('click', () => {
        clipboard.writeText(document.getElementById('gen').value)

        new window.Notification('PPG copied to clipboard!', {
            body: 'Your new password was copied to your clipboard.'
        })
    })
})