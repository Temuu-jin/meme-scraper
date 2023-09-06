## Node.js Meme Scraper

Completed ToDo's

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

.then((html)=>) here we use parse(html) to parse and assign the raw response text to root so we can use querySelectorAll('img') and select all <img>

imgElements.forEach((img)=>{}) loops through object array and pushes the src on an array imgSrcList

We now have an Array with all the src urls in order.

for limiting to 10 i had to change from forEach() to a for(limit){fetch().then().catch()} loop

JavaScript provides error.message to handle errors. when error is thrown a error object is generated with info about error
response.statusText is for error handling from the node-fetch library
