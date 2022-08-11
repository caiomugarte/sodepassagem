import React from "react";

function Aeroportos() {
  const [aeroportos, setAeroportos] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
      setAeroportos(json.aeroportos);
    }
    fetchData();
  }, []);

  return { aeroportos   };
}
export default Aeroportos;
