import fs from 'node:fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// Declare websiteUrl variable
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/'; // Replace with the actual website URL

fetch(websiteUrl)
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(`Failed to fetch the website: ${response.statusText}`);
    }
  })
  .then((html) => {
    // Parse the HTML content
    const root = parse(html);

    // select all <img> elements and extract their src attributes
    const imgElements = root.querySelectorAll('img');
    const imgSrcList = imgElements
      .map((img) => img.getAttribute('src'))
      .filter((src) => src);

    // limit the number of images to download
    const maxImagesToDownload = 10;

    // maxImagesToDownload Loop and Download (use filePath and imageUrl)
    for (
      let index = 0;
      index < imgSrcList.length && index < maxImagesToDownload;
      index++
    ) {
      const src = imgSrcList[index];

      /*
      every number under 10 gets a 0 before its index+1. if 10 its just index+1
      */
      const fileName = `img${index + 1 < 10 ? `0${index + 1}` : index + 1}.jpg`;
      /*
      Declare constants for downloading so the code looks neat. used for fs.writeFileSync
      */
      const filePath = `./memes/${fileName}`; // where to save
      const imageUrl = new URL(src, websiteUrl); // create an absolute URL

      fetch(imageUrl.href)
        .then((response) => {
          if (response.ok) {
            return response.arrayBuffer(); // return the image data as ArrayBuffer
          } else {
            throw new Error(`Failed to download image: ${response.statusText}`);
          }
        })
        .then((imageBuffer) => {
          fs.writeFileSync(filePath, Buffer.from(imageBuffer)); // convert the ArrayBuffer to Buffer
          console.log(`Downloaded and saved ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error downloading image: ${error.message}`);
        });
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
/*
Findings Timeline:

- Steps are:
  Fetch HTML Code --- Library found: node-fetch
  Parse HTML to find image links --- Library found: node-html-parser
  Download images
  Rename each to desired unique name
  save to specific directory

Fetch works in a way that it returns a "Promise" that represents the result of this asynchronous operation. The Promise will be in a pending state until the HTTP request is complete.

.then((response)=>{}) always has a response and a callback function to write what to do with this result from fetch

use if(response.ok) else for error handling

.then((html)=>) here we use parse(html) to  parse and assign the raw response text to root so we can use querySelectorAll('img') and select all <img>

imgElements.forEach((img)=>{}) loops through object array and pushes the src on an array imgSrcList

We now have an Array with all the src urls in order.

for limiting to 10 i had to change from forEach() to a for(limit){fetch().then().catch()} loop

JavaScript provides error.message to handle errors. when error is thrown a error object is generated with info about error
response.statusText is for error handling from the node-fetch library
 */
