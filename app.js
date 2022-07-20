#!/usr/bin/env node

const fetch = require("node-fetch");
const fs = require("fs");
const contentful = require("contentful-management");
require("dotenv").config();

const koboUrl = process.env.KOBO_URL;
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

fetch(koboUrl,
      {
	method: "get",
	headers: {"Authorization": `Token ${koboApiKey}` }
      })
  .then(response => response.json())
  .then(data => {
    const { results } = data;
    const submissionCounts = results.map(result => result.deployment__submission_count);
    if (submissionCounts.every(element => typeof element === "number")) {
      pushToContentful(submissionCounts);
    };
  });




  






