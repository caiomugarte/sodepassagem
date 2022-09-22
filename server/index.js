const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const axios = require("axios");

/*var empresasAreas = "";
var voos = "";
var itinerarios = "";
var aeroportos = "";
var cidades = "";*/

/*(async () => {
  try {
    const from = "BSB";
    const to = "SSA";
    const response = await axios.get(
      `https://skiplagged.com/api/search.php?from=${from}&to=${to}&depart=2022-10-20&return=&format=v3&counts%5Badults%5D=1&counts%5Bchildren%5D=0`
    );
    console.log(response.data.airlines);
    empresasAreas = response.data.airlines;
    voos = response.data.flights;
    itinerarios = response.data.itineraries;
    aeroportos = response.data.airports;
    cidades = response.data.cities;
  } catch (error) {
    console.log(error.response.body);
  }
})();*/
app.get("/api", (request, response) => {
  var from = request.query.from;
  var to = request.query.to;
  var depart = request.query.depart;
  var url = `https://skiplagged.com/api/search.php?from=${from}&to=${to}&depart=${depart}&return=&format=v3&counts%5Badults%5D=1&counts%5Bchildren%5D=0`;
  axios.get(url).then((res) => {
    const empresasAreas = res.data.airlines;
    const voos = res.data.flights;
    const itinerarios = res.data.itineraries;
    const aeroportos = res.data.airports;
    const cidades = res.data.cities;
    response.json({
      airlines: empresasAreas,
      voos: voos,
      message: "teste",
      itinerarios: itinerarios,
      aeroportos: aeroportos,
      cidades: cidades,
    });
  });
  console.log("Printando o request");
  console.log(request.query);
});

app.listen(PORT, () => {
  console.log(`Servidor listening em ${PORT}`);
});
