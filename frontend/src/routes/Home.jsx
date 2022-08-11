import ComboBox from "../components/ComboBox";
import Botao from "../components/Botao";
export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ float: "left", marginRight: "20px" }}>
        <ComboBox placeHolder="De" />
      </div>
      <div style={{ float: "left", marginRight: "20px" }}>
        <ComboBox placeHolder="Para" />
      </div>
      <Botao />
    </div>
  );
}
