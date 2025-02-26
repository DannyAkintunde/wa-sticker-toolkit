"use strict";

const { Sticker, createSticker } = require("./Sticker");
const { StickerTypes } = require("./lib/StickerTypes");
const { TextPositions } = require("./lib/addTextToMedia");

global.DEBUG = true;

module.exports = { Sticker, createSticker, StickerTypes, TextPositions };
