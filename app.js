#!/usr/bin/env node

const fetch = require("node-fetch");
const fs = require("fs");
const contentful = require("contentful-management");
require("dotenv").config();

// fetch('https://api.github.com/users/github').then(response => response.json()).then(data => console.log(data));

const koboApiKey = process.env.KOBO_API_KEY;
const contentfulApiKey = process.env.CONTENTFUL_API_KEY;
const contentfulSpace = process.env.CONTENTFUL_SPACE;

const client = contentful.createClient({
  accessToken: contentfulApiKey
})

async function pushToContentful(data) {
  const environment = await client
	.getSpace(contentfulSpace)
	.then((space) => space.getEnvironment("master"));
  const entry = await environment.getEntry("78TOLnzeDAxvjhMRnnsK2I");
  entry.fields.numberOfEnrolledPatients["en-US"] = data;
  entry.fields.dateAdded["en-US"] = Date.now();
  const updatedEntry = await entry.update();
  updatedEntry.publish();
  console.log(updatedEntry);
}

fs.readFile("./response.json", "utf8", (err, response) => {
  const data = JSON.parse(response);
  const { results } = data;
  const submissionCounts = results.map(result => result.deployment__submission_count);
  pushToContentful(submissionCounts);
  console.log(submissionCounts);
});






  






