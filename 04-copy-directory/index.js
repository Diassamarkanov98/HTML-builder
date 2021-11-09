const fs = require('fs');
const path = require('path');



function removeFolder(){
  fs.rmdir(`${__dirname}/files-copy`,
  { recursive: true}, (err) => {
    if (err) {
    return console.log("error occurred in deleting directory", err);
    }
    console.log("Directory deleted successfully");
    }); 
  }
function makeFolder(){
  fs.mkdir(path.join(__dirname, 'files-copy'),
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    });
}

function copyFolder(){
  if (fs.access(`${__dirname}/files-copy`, (err) => {
    if (err) {
      makeFolder();
      getCurrentFilenames();
    } else {
    removeFolder();
  }
  }));
}
function getCurrentFilenames() {
  makeFolder();
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
copyFolder();
