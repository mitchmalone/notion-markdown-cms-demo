const { slugify } = require("@meshcloud/notion-markdown-cms");

const frontMatterHelper = (page) => {
  let fmObject = new Object();
  
  page.properties.forEach((value, key) => {
    fmObject[slugify(key)] = value;
  });

  return fmObject;
};

module.exports = { frontMatterHelper };