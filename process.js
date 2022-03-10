const fs = require("fs");
const requireContext = require("require-context");

let availableNumbers = Array.from(
  { length: 4 },
  (item, index) => (item = index + 1)
);

function main() {

  
  try{
    console.log("Main");
    let numberOfFolders;

    numberOfFolders = fs.readdirSync(__dirname + "/AllChars").length;
  
    for (let i = 1; i <= numberOfFolders; i++) {
      createOutputFolders(`${__dirname}/AllChars/${i}`);
      // console.log(`${__dirname}/AllChars/${i}`, "`${__dirname}/AllChars/${i}`");
    }
  
    while (availableNumbers.length!==0) {
      for (let i = 1; i <= numberOfFolders; i++) {
        let dirLocation = `${__dirname}/AllChars/${i}`;
  
        processJSON(dirLocation);
  
        let imgsInFolder = fs.readdirSync(`${dirLocation}/build/images`)
  
        for (let j = 1; j <= imgsInFolder.length; j++) {
          let randomIndex = Math.floor(Math.random() * availableNumbers.length);
          let randomNumber = availableNumbers[randomIndex];
          shuffleSingle(dirLocation, randomNumber, j,randomIndex);
        }
      }
    }
  }catch(err){
    console.log(err)
  }

}

function shuffleSingle(_dirLocation, _randomNumber, _i,_randomIndex) {
  try{
  // console.log("Shuffling");
  const resource = require(_dirLocation + `/build/json/${_i}.json`);
  resource.image = `https://gateway.pinata.cloud/new URL/${_randomNumber}.png`;
  resource.edition = _randomNumber;
  resource.name = `Stunning Outfit #${_randomNumber}`;
  // console.log(resource, "edited resouce in shuffle" + _i);
  fs.writeFileSync(
    _dirLocation + `/build/json/${_i}.json`,
    JSON.stringify(resource),
    // function (err) {
    //   if (err) throw err;
    // }
  );

  fs.copyFileSync(
    _dirLocation + `/build/images/${_i}.png`,
    __dirname + `/build/Final/images/${_randomNumber}.png`,
    // (err) => {
    //   if (err) throw err;
    //   console.log(`${i} was transferred to ${_randomNumber}`);
    // }
  );

  fs.copyFileSync(
    _dirLocation + `/build/json/${_i}.json`,
    __dirname + `/build/Final/json/${_randomNumber}.json`,
    // (err) => {}
  );
  console.log(availableNumbers,"availableNumbers");
  availableNumbers.splice(_randomIndex, 1);
}
catch(err){
console.log(err);
}
}

function processJSON(_dirLocation) {
  try{
    const removeFlag = "remove";

    const context = requireContext(_dirLocation + "/build/json", true, /.json$/);
    context.keys().forEach((key) => {
      const fileName = key;
      if (fileName === "_metadata.json") {
        return;
      }
      const resource = require(_dirLocation + `/build/json/${fileName}`);
      let allAttribs = resource.attributes;
      allAttribs = allAttribs.filter((item) => item.value !== removeFlag);
      resource.attributes = allAttribs;
  
      fs.writeFileSync(
        _dirLocation + `/build/json/${fileName}`,
        JSON.stringify(resource),
        // function (err) {
        //   if (err) throw err;
        // }
      );
    });
  }catch(err){
console.log(err);
}
  
}

function createOutputFolders(_dirLocation) {
  try{
    fs.mkdirSync(
      _dirLocation + "/build/output/json",
      { recursive: true },
    );
  
    fs.mkdirSync(
      _dirLocation + "/build/output/images",
      { recursive: true },
     
    );
  }catch(err){
console.log(err);
}
 
}

main();
