const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const axios = require('axios');

var empresasAreas = "";
var voos = "";
var itinerarios = "";

(async () => {
  try {
    const response = await axios.get('https://skiplagged.com/api/search.php?from=BSB&to=SSA&depart=2022-10-20&return=&format=v3&counts%5Badults%5D=1&counts%5Bchildren%5D=0')
    console.log(response.data.airlines);
    empresasAreas = response.data.airlines;
    voos = response.data.flights;
    itinerarios = response.data.itineraries;
  } catch (error) {
    console.log(error.response.body);
  }
})();

app.get("/api", (request, response) => {
    response.json({
        airlines: empresasAreas,
        voos : voos,
        message : "teste",
        itinerarios : itinerarios,

    
    });
});


app.listen(PORT, () => {
    console.log(`Servidor listening em ${PORT}`);
});

