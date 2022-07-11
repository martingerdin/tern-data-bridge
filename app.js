#!/usr/bin/env node

const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

// fetch('https://api.github.com/users/github').then(response => response.json()).then(data => console.log(data));

const koboApiKey = process.env.KOBO_API_KEY;
const contentfulApiKey = process.env.CONTENTFUL_API_KEY;

fs.readFile("./response.json", "utf8", (err, response) => {
  const data = JSON.parse(response);
  const { results } = data;
  const submissionCounts = results.map(result => result.deployment__submission_count);
  console.log(submissionCounts);
});

  






