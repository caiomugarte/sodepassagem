import ComboBox from "../components/ComboBox";
import Botao from "../components/Botao";
import React from "react";
import DataPick from "../components/DataPick";

export default function Home() {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [date, setDate] = React.useState("");

  function checaInput() {
    if (from && to && date) {
      return true;
    } else {
      return false;
    }
  }
  function formataParametro(parametroUrl) {
    if (parametroUrl) {
      return parametroUrl.split("(")[1].split(")")[0];
    }
    return "";
  }

  function formataDateParametro(date) {
    var dia = date.getDate();
    var mes = date.getMonth();
    var ano = date.getFullYear();
    return `${ano}-${("0" + (mes + 1)).slice(-2)}-${("0" + dia).slice(-2)}`;
  }

  function getFrom(data) {
    console.log("Printando valor selecionado para 'DE' ");
    console.log(data);
    setFrom(formataParametro(data));
  }

  function getTo(data) {
    console.log("Printando valor selecionado para 'TO' ");
    console.log(data);
    setTo(formataParametro(data));
  }
  function getDate(data) {
    console.log("Printando valor selecionado para 'Date'");
    console.log(data);
    setDate(formataDateParametro(data));
  }
  return (
    <div style={{ padding: 20 }}>
      <div style={{ float: "left", marginRight: "20px" }}>
        <ComboBox inputValue={getFrom} placeHolder="De" />
      </div>
      <div style={{ float: "left", marginRight: "20px" }}>
        <ComboBox inputValue={getTo} placeHolder="Para" />
      </div>
      <div style={{ float: "left", marginRight: "20px" }}>
        <DataPick dateValue={getDate} />
      </div>
      <div style={{ float: "left", marginRight: "20px" }}>
        <Botao
          from={from}
          to={to}
          date={date}
          isInputPreenchidos={!checaInput()}
        />
      </div>
    </div>
  );
}
