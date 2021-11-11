const path = require('path');
const fs = require('fs');

let line
const streamTxt = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding:'utf-8'});

streamTxt.on('data', (data) => console.log(data));
streamTxt.on('error', (err) => console.error(`err: ${err}`));
