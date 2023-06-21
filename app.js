const express = require("express");
const { exec } = require("shelljs");
const fs = require("fs");
const {} = require("readline")

const { join } = require("path");
const { getName } = require("./source");
const app = express();

app.get("/", async (req, res) => {
 const functionName = "cronForAfsGab1Pod1Zone2shahsi"   
const str = `exports.${functionName} = async () => {
try {
setInterval(async () => {
  handlePortRequest('afs-gab1-pod1-zone1');
  handleFcrRequest('afs-gab1-pod1-zone1');
}, 60000);
} catch (e) {
console.log(e);
}
};\n`;
fs.appendFileSync("./source.js", str, (err,data) => {
    console.log('ERROR: ', err);
    console.log("data",data)
  })
  let rawdata = fs.readFileSync('./test.js', "utf-8");
  const fileStr = rawdata.trim().slice(0, -2);
 const output = `${fileStr}${functionName}()\n};`
 fs.writeFileSync("./test.js", output)
console.log("test")

let importString = fs.readFileSync('./test.js', "utf-8");
let newLine='';
let index =0;
const importToAdd=`${functionName}`
for(let i=0;i<importString.length;i++){
    if(importString[i]==='}')
    {
        index =i
        newLine=newLine+importToAdd+importString.slice(index)
        break;
    }
    newLine=newLine+importString[i];
}
fs.writeFileSync("./test.js", newLine)
 res.json({
    message: "ok",
  });
 return 
});

app.listen(8000, () => {
  console.log("server is listing on 8000");
});
