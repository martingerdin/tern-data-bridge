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


fs.readFile("./response.json", "utf8", (err, response) => {
  const data = JSON.parse(response);
  const { results } = data;
  const submissionCounts = results.map(result => result.deployment__submission_count);
  console.log(submissionCounts);
});

client.getSpace(contentfulSpace)
.then((space) => space.getEnvironment("master"))
.then((environment) => environment.createEntry("enrolledPatients", {
  fields: {
    title: {
      "en-US": "Enrolled patients",
    },
    numberOfEnrolledPatients: {
      "en-US": {"test": "test"},
    }
  }
}))
.then((entry) => console.log(entry))
.catch(console.error)


  






