# 🔑 PPG

This app was created to take the place of MacOS's [Arcana](https://www.tekuris.com/products/arcana/), which will be lost to time in future versions of MacOS and to bring it to Windows.

## Powerful Password Generator

Small password generator "utility" for Windows, Mac, & *possibly* Linux.

There might be some helpful information in the Wiki if we get around to making it.

## Note

The passwords generated in PPG would take more than 15 hundred million years (according to HSIMP).

Your passwords will never be sent over the internet.

# Updating PPG

First, uninstall PPG.

The uninstall `.exe` can be found here: `C:\Program Files (x86)\PGG\unins000.exe`.

Then download the newest version from the releases page.

# Usage

Simply start the app. It automatically generates a password on startup. However, it does not copy to clipboard.

**To copy to clipboard**, simply click `Copy`. You should get a notification saying that it was copied.

## "tray mode"

Right-click the tray icon, then hover over `Password` a click `Generate new and copy`. That will generate a new password (cannot be seen until pasted) and copy it to clipboard. It will also send a notification.

# Building from source

There are a few files missing from the source code. If you are interested in building this app from the source code, please let me know and I'll give you the files.

- `dictionary.json`: a dictionary file formatted as JSON
- `words.txt`: a text file with 100,000+ words
- `style.css`: TailwindCSS with a different file name

The reason these file are rmoved relates to their size. They're very big files. (also, I'm picky: GitHub said my repo was mostly CSS, when it's not. It was just the massive size of tailwind)

# Reference

https://github.com/dwyl/english-words

https://www.security.org/how-secure-is-my-password/

https://www.npmjs.com/package/hsimp

https://www.tekuris.com/products/arcana/
