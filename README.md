<div align="center">
<img src="https://files.catbox.moe/tzde2e.png"/>

# WA Sticker Toolkit

[![NPM](https://img.shields.io/npm/l/wa-sticker-toolkit?style=flat-square&label=License)](https://github.com/DannyAkintunde/wa-sticker-toolkit/blob/main/LICENSE) [![CodeFactor](https://img.shields.io/codefactor/grade/github/DannyAkintunde/wa-sticker-toolkit?style=flat-square&label=Code%20Quality)](https://www.codefactor.io/repository/github/dannyakintunde/wa-sticker-toolkit) [![NPM](https://img.shields.io/npm/dw/wa-sticker-toolkit?style=flat-square&label=Downloads)](https://npmjs.com/package/wa-sticker-toolkit)

</div>

## Installation

```cmd
> npm i wa-sticker-toolkit
```

## Usage

`wa-sticker-toolkit` provides two ways to create stickers.
The paramers are the same for both.

1. First is the Buffer, SVG String, URL, Base64 encoded string, File path of static image, GIF or Video. The second is the options. GIFs and Videos will output an animated WebP file.

2. 2nd Paramter, an object, Sticker Options accepts the following fields

```js
{
    metadata: {
        pack: "The pack name.",
        author: "The author name.",
        id: "The sticker id, if this property is undefined it will be generated.",
        categories: "The sticker categories, this is used for the sticker search feature on whatsapp (default:undefined)."
    },
    type: "Value from the StickerTypes Object (exported), available values are 'circle', 'crop', 'fill' or undefined default (shrink)",
    quality: "The quality of the output file, (int: 1-100)",
    backgroundColor: "The background color in hexadecimal format, rgba object (sharp), defaults to undefined (transparent)",
    background: "A short hand to backgroundColor",
    // border options
    borderWidth: "The width of the border, default undefined (int:0)",
    borderColor: "The color of the border in hexadecimal format, default undefined (white).",
    borderRadius: "The radius for the border i.e use for round edges, int or percentage string ('50%') default undefined (int:0)",
    // text options
    text: {
        content: "The text to display on the sticker (str)",
        color: "The color of the text in hexadecimal format, default undefinded (white)",
        font: "The font of the text, default undefined (Sans)",
        fontSize: "The font size of the text, defaults undefined (int:21)",
        position: "This defines the position of the text on the sticker, value form the TextPositions Object (exported), available values are 'top', 'center', 'bottom', default undefined ('center')"
    },
    text: "If value is string it's an alias to text.content"
}
```

## Import

before using the library you need to import it.

```js
const {
    Sticker,
    createSticker,
    StickerTypes,
    TextPositions
} = require("wa-sticker-toolkit"); // common js, es6 not supported.
```

## Using the sticker Constructor (Recomended)

```js
const sticker = new Sticker(image, {
    metadata {
        pack: 'My Pack', // The pack name
        author: 'Me', // The author name
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
    },
    type: StickerTypes.FULL, // The sticker type
    quality: 50, // The quality of the output file
    background: '#000000' // The sticker background color.
})

const buffer = await sticker.toBuffer() // convert to buffer
// or save to file
await sticker.toFile('sticker.webp')

// or get Baileys-MD Compatible Object
conn.sendMessage(jid, await sticker.toMessage())

```

You can also chain methods like this:

```js
const buffer = await new Sticker(image)
    .setPack("My Pack")
    .setAuthor("Me")
    .setType(StickerTypes.FULL)
    .setCategories(["🤩", "🎉"])
    .setId("12345"),
    .setBackgroundColor("#000000") // or .setBackground
    .setQuality(50)
    .toBuffer();
```

The `image` (first parameter) can be a Buffer, URL, SVG string, Base64 encode string, or File path.

### SVG Example

```js
const sticker = new Sticker(
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-119.1 0-216-96.9-216-216S136.9 40 256 40s216 96.9 216 216-96.9 216-216 216z" fill="#ff0000" />
    </svg>
`,
    { author: "W3", text: { content: "Wow, a loop", color: "red" } }
);
```

## Using the `createSticker` function

```js
const buffer = await createSticker(buffer, options); // same params as the constructor
// NOTE: `createSticker` returns a Promise of a Buffer
```

## Options

The following options are valid:

```js
{
    metadata?: {
        pack?: string,
        author?: string,
        id?: string,
        categories?: []
    },
    type?: StickerTypes || string,
    quality?: number,
    backgroundColor?: Sharp.color,
    // border options
    borderWidth?: number,
    borderColor?: number,
    borderRadius?: number || string,
    // text options
    text?: {
        content: string,
        color?: string,
        font?: string,
        fontSize?: number,
        position?: TextPositions || string
    }
}
```

## Sticker Types and TextPositions

Sticker types and Test Positions are exported as an object.

```js
const StickerTypes = Object.freeze({
    DEFAULT: 'default',
    CROPPED: 'crop',
    FILL: 'fill',
    CIRCLE: 'circle,
})

```

```js
const TextPositions = Object.freeze({
    TOP: "top",
    CENTER: "center",
    BOTTOM: "bottom"
});
```

## Background

Background can be a hex color string or a sharp color object.

```JSON
{
    "background": "#FFFFFF"
}
```

or

```JSON
{
    "background": {
        "r": 255,
        "g": 255,
        "b": 255,
        "alpha": 1
    }
}
```

but note the tect color only accepts hexcodes as values.

# Metadata

Here's some basic information about WhatsApp Sticker Metadata.

In WhatsApp, stickers have their own metadata embedded in the WebP file as They hold info like the author, the title or pack name and the category.

### 1. Author and Pack Title

<a href="https://ibb.co/MhyzMwJ"><img src="https://i.ibb.co/9vmxsKd/metadata.jpg" alt="metadata" border="0" width=256></a>

The text on bold is the pack title and the rest is the author.
This is actually [Exif](https://en.wikipedia.org/wiki/Exif) Metadata embedded in the WebP file.

### 2 Sticker Category

## This is an array of Emojis. [Learn More](https://github.com/WhatsApp/stickers/wiki/Tag-your-stickers-with-Emojis)

thanks for using `wa-sticker-toolkit`.
