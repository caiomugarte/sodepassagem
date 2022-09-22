import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Voos() {
  console.log("Oi to dentro do componente dos voos");
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");
  const to = params.get("to");
  const depart = params.get("depart");
  const [voos, setVoos] = React.useState();
  const [message, setMessage] = React.useState(null);
  const [itinerarios, setItinerarios] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api?from=${from}&to=${to}&depart=${depart}`
      );
      const json = await response.json();
      setMessage(json.message);
      setItinerarios(json.itinerarios.outbound);
      setVoos(json.voos);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>{!message ? "Loading..." : message}</p>
      <div>
        <Container>
          <List
            sx={{
              border: 1,
              padding: 2,
              borderRadius: 2,
              borderColor: "#808080",
            }}
          >
            {itinerarios.map((itinerario) => {
              const { horaSaida, horaChegada, preco, vooItinerario, trajetos } =
                setaDadosVoos(itinerario, voos);
              return (
                <div>
                  <Accordion
                    sx={{
                      border: 1,
                      borderColor: "#808080",
                      padding: 1,
                      marginBottom: "10px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        sx={{
                          fontSize: "20px",
                          marginRight: 10,
                        }}
                      >
                        {getDuracaoVoo(horaSaida, horaChegada)}h
                      </Typography>
                      <Typography>
                        {getHoraVoo(horaSaida)}
                        <Typography sx={{ display: "inline", padding: 1 }}>
                          -
                        </Typography>
                        {getHoraVoo(horaChegada)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Preco: {preco} {vooItinerario}
                        {trajetos[0][1]}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
            {getDadosVoo()}
          </List>
        </Container>
      </div>
    </div>
  );
}
function getDuracaoVoo(horaSaida, horaChegada) {
  var date1 = new Date(horaSaida);
  var date2 = new Date(horaChegada);
  return Math.round(Math.abs(date1 - date2) / 36e5);
}

function setaDadosVoos(itinerario, voos) {
  const id = carregaIdItinerario(itinerario);
  const preco = calculaPreco(itinerario);
  const vooItinerario = itinerario.flight;
  const dadosVoo = getDadosVoo(vooItinerario, voos);
  const trajetos = getTrajetos(dadosVoo);
  const horaSaida = trajetos[0][2];
  const horaChegada = trajetos[trajetos.length - 1][4];
  return { horaSaida, horaChegada, preco, vooItinerario, trajetos };
}

function getHoraVoo(horaVoo) {
  return horaVoo.split("T")[1].split(":00-")[0];
}
function getTrajetos(dadosVoo) {
  var legs = JSON.parse(dadosVoo.split("|")[1]).legs;
  console.log("printadno legs");
  console.log(legs);
  return legs;
}
function getDadosVoo(idVoo, voos) {
  if (voos) {
    console.log(voos[idVoo].data);
    return voos[idVoo].data;
  }
}
function calculaPreco(itinerario) {
  var preco = itinerario.data.split(":")[1].split(",")[0];
  return convertePrecoReal(preco);
}

function convertePrecoReal(preco) {
  var real = preco * 0.051;
  return Math.ceil(real);
}
function carregaIdItinerario(itinerario) {
  var id = itinerario.data.split("|")[0];
  return id;
}
/**<Stack>
                <Box sx={{}}>{getHoraVoo(trajetos[0][2])}</Box>
                <Box>{trajetos[0][1]}</Box>
                <Box sx={{ borderBottom: 1 }}>
                  Preço: {preco} {vooItinerario}
                </Box>
              </Stack> */
