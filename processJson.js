const requireContext = require("require-context");
var fs = require("fs");

function processJSON() {
  const removeFlag = "remove";

  const context = requireContext(__dirname + "/build/json", true, /.json$/);
  context.keys().forEach((key) => {
    const fileName = key; //replace("./", "");
    // console.log(fileName);
    if (fileName === "_metadata.json") {
      return;
    }
    const resource = require(__dirname + `/build/json/${fileName}`);
    let allAttribs = resource.attributes;
    allAttribs = allAttribs.filter((item) => item.value !== removeFlag);
    resource.attributes = allAttribs;
    
    fs.writeFile(
      __dirname + `/build/json/${fileName}`,
      JSON.stringify(resource),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  });
}
processJSON();
