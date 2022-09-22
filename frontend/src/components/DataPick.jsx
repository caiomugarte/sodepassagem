import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ptBRLocale from "date-fns/locale/pt-BR";

export default function DataPick(props) {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
      <DatePicker
        label="Selecione uma Data"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.dateValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
