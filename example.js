// This file contains an example of how the @notionhq/client package and API
// can be used to fetch cover image, people type, file type, and formula type

const { Client } = require('@notionhq/client');

// Don't worry about this, I will destroy this token later
const notion = new Client({
  auth: 'secret_TfTzuZwy09AyFjcWm8GOL5DE00pk8EiFQ4W5G9CI8W'
});

(async () => {
  const pageId = 'a9671598-fa77-4cbf-8ea3-b81ac01275ca';

  const response = await notion.pages.retrieve({ page_id: pageId });

  // Cover Image
  const coverImageUrl = response.cover.external.url

  // People
  const userId = response.properties['Author'].people[0].id;
  const person = await notion.users.retrieve({ user_id: userId });
  const personName = person.name;

  // File
  const fileUrl = response.properties['Feature Image'].files[0].file.url;

  // Formula
  const formulaString = response.properties['Publish Channels'].formula.string;

  console.log(`Cover Image: ${coverImageUrl}`);
  console.log(`Author: ${personName}`);
  console.log(`Feature Image: ${fileUrl}`);
  console.log(`Formula: ${formulaString}`);
})();