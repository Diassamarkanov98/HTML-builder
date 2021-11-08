const fs = require('fs');
const path = require('path');
  
fs.mkdir(path.join(__dirname, 'files-copy'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    getCurrentFilenames();
    console.log('Directory created successfully!');
  });

  function getCurrentFilenames() {
    console.log("\nCurrent filenames:");
    fs.readdir(`${__dirname}/files`, (err, files) => {
        if (err)
          console.log(err);
        else {
          console.log("\nCurrent directory filenames:");
          files.forEach(file => {
            fs.copyFile(`${__dirname}/files/${file}`,`${__dirname}/files-copy/${file}`,(err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
              });
            console.log(file);
          })
        }
      })
  }
