import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Botao(props) {
  const navigate = useNavigate();

  function searchVoos() {
    navigate(`/voos?from=${props.from}&to=${props.to}&depart=${props.date}`);
  }
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={searchVoos}
        variant="contained"
        disabled={props.isInputPreenchidos}
      >
        Buscar Voos
      </Button>
    </Stack>
  );
}
