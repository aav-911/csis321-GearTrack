import { createRoot } from "react-dom/client";
import EquipmentList from "./EquipmentList.jsx"; //[cite: 3]
import FormField from "./AddEquipment.jsx";      //[cite: 1]
import "./style.css";                             //[cite: 4]

createRoot(document.getElementById("app")).render(
  <div style={{ padding: "20px" }}>
    <h1>GearTrack Dashboard</h1>
    <FormField />
    <hr style={{ margin: "30px 0" }} />
    <EquipmentList />
  </div>
);