import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

const parsedBody = parse(body);

const images = parsedBody.querySelectorAll('img');

images.forEach((img) => {
  img.src;
});

console.log(images);

/*

Findings Timeline:

Steps are:
Fetch HTML Code --- Library found: node-fetch
Parse HTML to find image links --- Library found: node-html-parser
Download images
Rename each to desired unique name
save to specific directory


--- Implemented Fetch Library:
const response = await fetch('lazytopastasojustmemelink.netlify.app',);

const body = await response.text();

console.log(parsedBody);

return was HTML Body Code, WORKING! :D

--- Implement Parse Library:
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

const parsedBody = parse(body);

console.log(parsedBody);

return:
temu@LAPTOP-Q55UNDJC MINGW64 /d/Projects/meme-scraper (main)
$ node index.js
<ref *1> HTMLElement {
  parentNode: null,
  childNodes: [
    TextNode {
      parentNode: [Circular *1],
      childNodes: [],
      nodeType: 3,
      _rawText: '<!DOCTYPE html>\n'
    },
    HTMLElement {
      parentNode: [Circular *1],
      childNodes: [Array],
      rawAttrs: '',
      voidTag: [VoidTag],
      nodeType: 1,
      rawTagName: 'html',
      id: '',
      _parseOptions: {},
      classList: [DOMTokenList]
    },
    TextNode {
      parentNode: [Circular *1],
      childNodes: [],
      nodeType: 3,
      _rawText: '\n'
    }
  ],
  rawAttrs: '',
  voidTag: VoidTag {
    addClosingSlash: false,
    voidTags: Set(14) {
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr'
    }
  },
  nodeType: 1,
  rawTagName: null,
  id: '',
  _parseOptions: {},
  classList: DOMTokenList {
    _set: Set(0) {},
    _afterUpdate: [Function (anonymous)]
  }
}

What do I do with this info parsed? IDK
Looks like 'source' is one of the attributes I have to use to loop through the 'src' string which I need for downloading the img's

Can I create an Array or Objects that loops through all the src and saves them in numerical order (img01, img02, etc.)
Each object has attributes. Name: img01, Link: parsed string

These will be used later on for Downloading from Link and then saving with correct Name

Dont know yet how to download and save under specific name so I might be wrong

BUT, the Parser Library is installed correctly and works!

*/
