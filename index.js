const { slugify, SyncConfig, sync } = require("@meshcloud/notion-markdown-cms");
const { rimraf } = require('rimraf');
const { frontmatterHelper } = require('./helpers');
const fs = require('fs');

const outputDir = './docs';

const config = {
  cmsDatabaseId: 'b28eb69fdbac46a7b42f6b3523e7ba29',
  pages: {
    destinationDirBuilder: (page) => slugify(page.properties.get("Category")),
    frontmatterBuilder: (page) => ({
      id: page.meta.id,
      url: page.meta.url,
      title: page.meta.title,
      
      // TODO: People
      author: page.properties.get("Author"),
      primaryChannel: page.properties.get("Primary Channel"),
      secondaryChannels: page.properties.get("Secondary Channels"),
      publishDate: page.properties.get("Publish Date"),
      publishUrl: page.properties.get("Publish URL"),
      status: page.properties.get("Status"),
      category: page.properties.get("Category"),
      tags: page.properties.get("Tags"),
      metaDescription: page.properties.get("Meta Description"),
      location: page.properties.get("Location"),
      link: page.properties.get("Link"),
      
      // TODO: File
      featureImage: page.properties.get("Feature Image"),
      
      // TODO: Formula
      errors: page.properties.get("Errors"),
      featureImage: page.properties.get("Feature Image"),
      
      // TODO: Formula
      publishChannels: page.properties.get("Publish Channels"),
    }),
  },
  databases: {
    'b28eb69fdbac46a7b42f6b3523e7ba29': {
      sorts: [
        {
          property: "Publish Date",
          direction: "ascending",
        }
      ],
      renderAs: "pages+views",
      pages: {
        destinationDirBuilder: (page) => {
          return slugify(page.properties.get("Name"));
        },
        frontmatterBuilder: (page) => ({
          id: page.meta.id,
          url: page.meta.url,
          title: page.meta.title,
          
          // TODO: People
          author: page.properties.get("Author"),
          primaryChannel: page.properties.get("Primary Channel"),
          secondaryChannels: page.properties.get("Secondary Channels"),
          publishDate: page.properties.get("Publish Date"),
          
          // TODO: Formula
          publishUrl: page.properties.get("Publish URL"),
          status: page.properties.get("Status"),
          category: page.properties.get("Category"),
          tags: page.properties.get("Tags"),
          metaDescription: page.properties.get("Meta Description"),
          location: page.properties.get("Location"),
          link: page.properties.get("Link"),
          
          // TODO: File
          featureImage: page.properties.get("Feature Image"),
          
          // TODO: Formula
          errors: page.properties.get("Errors"),
          featureImage: page.properties.get("Feature Image"),
          
          // TODO: Formula
          publishChannels: page.properties.get("Publish Channels"),
        }),
      },
      views: [
        {
          title: "By Category",
          properties: {
            groupBy: "Category",
            include: ["Category"],
          },
        },
      ]
    },
  },
};

async function main() {
  rimraf.sync("docs/!(README.md)**/*");

  // change into the docs dir, this simplifies handling relative paths
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
    process.chdir(outputDir);
  } else {
    process.chdir(outputDir);
  }

  // Don't worry about the secret, I will destroy this key after the project
  const rendered = await sync('secret_TfTzuZwy09AyFjcWm8GOL5DE00pk8EiFQ4W5G9CI8W', config);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});