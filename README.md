# PPG

Small password generator "utility" for Windows, Mac, & *possibly* Linux.

# Usage

Simply start the app. It automatically generates a password on startup. However, it does not copy to clipboard.

**To copy to clipboard**, simply click `Copy`. You should get a notification saying that it was copied.

## "tray mode"

Right-click the tray icon, then hover over `Password` a click `Generate new and copy`. That will generate a new password (cannot be seen until pasted) and copy it to clipboard. It will also send a notification.

# Reference

https://github.com/dwyl/english-words

https://www.security.org/how-secure-is-my-password/

https://www.npmjs.com/package/hsimp

https://www.tekuris.com/products/arcana/

# Building from source

```sh
npm install
```

then...

```sh
node get.js
```

(this gets the database of words and writes it to a file)