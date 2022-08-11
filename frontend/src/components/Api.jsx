import React from "react";

function Api() {
  const [voos, setVoos] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [itinerarios, setItinerarios] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
      setMessage(json.message);
      setVoos(Object.values(json.voos));
      setItinerarios(json.itinerarios.outbound);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>{!message ? "Loading..." : message}</p>
      <div>
        {itinerarios.map((itinerario) => {
          const id = carregaIdItinerario(itinerario);
          const preco = calculaPreco(itinerario);
          return (
            <div id={id}>
              <div>
                <span>
                  Preco: {preco}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
function calculaPreco(itinerario) {
  var preco = itinerario.data.split(':')[1].split(',')[0];
  return convertePrecoReal(preco)
}

function convertePrecoReal(preco) {
  var real = preco * 0.051;
  return Math.ceil(real)
}
function carregaIdItinerario(itinerario) {
  var id = itinerario.data.split("|")[0];
  return id 
}  

export default Api;
