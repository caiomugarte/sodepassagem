import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props) {
  const [opcoes, setOpcoes] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
      setOpcoes(configuraOpcoesComboBox(json));
    }
    fetchData();
  }, []);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={opcoes}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={props.placeHolder} />
      )}
    />
  );
}

function configuraOpcoesComboBox(json) {
  const siglas = Object.keys(json.cidades);
  const aeroportos = Object.values(json.aeroportos);
  const cidades = Object.values(json.cidades);
  const opcoes = [];
  for (let i = 0; i < aeroportos.length; i++) {
    opcoes.push(
      cidades[i].name + " - " + aeroportos[i].name + " - " + siglas[i]
    );
  }
  return opcoes;
}
