const path = require("path");
const fs = require("fs");
const { generateTheme, getLessVars } = require("ant-theme-generator");

const showColorSet = process.env.COLOR === "true";

const varFile = path.join(__dirname, "./src/assets/theme/var.less");
const varJsonPath = path.join(__dirname, "./color.json.js");
const outputFilePath = path.join(__dirname, "./public/color.less");

const defaultPath = path.join(__dirname, "./src/assets/theme/default.json");
const darkPath = path.join(__dirname, "./src/assets/theme/dark.json");

const antdDefaultPath = "./node_modules/antd/lib/style/themes/default.less";
const antdDarkPath = "./node_modules/antd/lib/style/themes/dark.less";
const antdLightPath = "./node_modules/antd/lib/style/themes/compact.less";

function colorStart() {
  try {
    var varStr = fs.readFileSync(varFile, "utf-8");
  } catch (error) {
    throw error;
  }


  let varStrArr = varStr.split(/\n/);
  let scipteReg = /\/\/\s+script/g;
  let slice = [];
  varStrArr.forEach((i, index) => {
    if (scipteReg.test(i)) {
      slice.push(index);
    }
  });
  varStrArr = varStrArr.slice(...slice).filter((i) => i[0] === "@");
  let colorsReg = /(.*?)\s*:\s*(.*?);\s*\/\/\s*([\u4e00-\u9fa5]*)/g;
  let varColors = [];
  varStrArr.forEach((item) => {
    colorsReg.lastIndex = 0;
    let execRes = colorsReg.exec(item);
    if (execRes) {
      varColors.push({
        title: execRes[3],
        key: execRes[1],
        value: execRes[2],
      });
    }
  });

  var tips = "\n// Ce fichier est généré automatiquement par le script";
  let exportStr = "module.exports=" + JSON.stringify(varColors) + tips;
  fs.writeFileSync(varJsonPath, exportStr);
  const defaultVars = getLessVars(antdDefaultPath);
  const darkVars = {
    ...getLessVars(antdDarkPath),
    "@primary-color": defaultVars["@primary-color"],
    "@picker-basic-cell-active-with-range-color": "darken(@primary-color, 20%)",
  };
  const lightVars = {
    ...getLessVars(antdLightPath),
    "@primary-color": defaultVars["@primary-color"],
  };
  const configVars = reduceMap(varColors, "key", "value");
  try {

    fs.writeFileSync(
      defaultPath,
      JSON.stringify({
        ...defaultVars,
        ...lightVars,
        ...configVars,
      })
    );
    fs.writeFileSync(
      darkPath,
      JSON.stringify({
        ...defaultVars,
        ...darkVars,
        ...configVars,
      })
    );
  } catch (error) {
    throw error;
  }


  const options = {
    antDir: path.join(__dirname, "./node_modules/antd"),
    stylesDir: path.join(__dirname, "./src"),
    varFile,
    themeVariables: Array.from(
      new Set([
        ...Object.keys(darkVars),
        ...Object.keys(lightVars),
        ...Object.keys(defaultVars),
        ...varColors.map((i) => i.key),
      ])
    ),
    indexFileName: "index.html",
    outputFilePath,
  };

  generateTheme(options)
    .then((less) => {
      console.log("Theme generated successfully");
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function reduceMap(listObj, key, value) {
  return listObj.reduce((a, c) => {
    a[c[key]] = c[value];
    return a;
  }, {});
}

function delFile(path) {
  if (typeof path === "string") {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
    return;
  }
  if (Array.isArray(path)) {
    path.forEach((item) => delFile(item));
  }
}

if (showColorSet) {
  colorStart();
} else {
  delFile([varJsonPath, outputFilePath, defaultPath, darkPath]);
}
