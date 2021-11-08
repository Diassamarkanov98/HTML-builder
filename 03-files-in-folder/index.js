const fs = require('fs');
const path = require('path');
  
fs.readdir(`${__dirname}/secret-folder`, 
  { withFileTypes: true },
  (err, files) => {
  console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
        fs.stat(__filename, (err, stats) => {
            if (err) throw err;
            if (file.isFile() === true) {
                console.log(`${path.parse(file.name).name} - ${path.extname(file.name).replace(/./, '')} - ${stats.size / 1000}kb`);
            } 
        });
    })
  }
})
