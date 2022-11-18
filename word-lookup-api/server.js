const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const url = "https://www.oxfordlearnersdictionaries.com/definition/english/";

app.use(cors());

async function scrapeData(word) {
  try {
    const { data } = await axios.get(`${url}${word}`);
    const $ = cheerio.load(data);
    const def = $(".def").text();
    const pron_us = $(".phons_n_am").children(".pron-us").attr("data-src-mp3");

    return { word, def, pron_us };
  } catch (err) {
    console.log(err.message);
  }
}

app.get("/:word", async (req, res) => {
  const { word } = req.params;
  if (word !== "favicon.ico") {
    const data = await scrapeData(word);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 3));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
