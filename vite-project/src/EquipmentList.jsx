import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

export default function EquipmentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEquipment() {
      const { data, error } = await supabase.from("Equipment").select("*");

      if (error) {
        setError(error.message);
      } else {
        setItems(data ?? []);
      }

      setLoading(false);
    }
    loadEquipment();
  }, []);

  if (loading) return <p>Loading equipment...</p>;
  if (error) return <p role="alert">Could not load equipment: {error}</p>;
  if (items.length === 0) return <p>No equipment found.</p>;

  return (
    <section className="equipment-panel">
      <h1>Equipment Inventory</h1>

      <div className="equipment-table-scroll">
        <table className="equipment-table">
          <thead>
            <tr>
              <th scope="col">Equipment</th>
              <th scope="col">Grouping</th>
              <th scope="col">Make / Model</th>
              <th scope="col">Location</th>
              <th scope="col">Count</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.Equipment}</td>
                <td>{item.Grouping}</td>
                <td>{[item.Make, item.Model].filter(Boolean).join(" ")}</td>
                <td>{item.Location}</td>
                <td>{item.Count}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
