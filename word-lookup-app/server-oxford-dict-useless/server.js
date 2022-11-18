const express = require("express");
const axios = require("axios");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/:word", async (req, res) => {
  try {
    const { word } = req.params;

    const options = {
      method: "GET",
      mode: "no-cors",
      headers: {
        app_id: "46c40e70",
        app_key: "ffe471abe09af39358b0525c9dd68548",
      },
    };
    const response = await axios.get(
      ` https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
      options
    );
    console.log(response.statusText);

    res.json(response.data);
  } catch (error) {
    console.error(error.response.status);
    console.error(error.message);
    console.error(error);

    if (error.response.status === 404)
      res.json({ response: "not found", status: error.response.status });
  }
});

const port = 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
