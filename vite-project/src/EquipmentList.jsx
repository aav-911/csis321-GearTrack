import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import AddEquipment from "./AddEquipment.jsx";

function formatMakeModel(item) {
  const parts = [item.Make, item.Model].filter((value) => {
    if (typeof value !== "string") return false;

    const cleaned = value.trim();
    return cleaned !== "" && !["n/a", "na"].includes(cleaned.toLowerCase());
  });

  return parts.length > 0 ? ` (${parts.join(" - ")})` : "";
}

export default function EquipmentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState("list");

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
  }, [page]);

  if (loading && page === "list") return <p>Loading equipment...</p>;
  if (error && page === "list") return <p role="alert">Could not load equipment: {error}</p>;

  return (
    <section className="equipment-panel">
      {/* Navigation buttons to switch pages */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button className="btn" onClick={() => setPage("list")}>Equipment Inventory</button>
        <button className="btn" onClick={() => setPage("add")}>Add Equipment</button>
      </div>

      {page === "list" ? (
        items.length === 0 ? (
          <p>No equipment found.</p>
        ) : (
          <>
            <h1>Equipment Inventory</h1>
            <div className="equipment-table-scroll">
              <table className="equipment-table">
                <thead>
                  <tr>
                    <th scope="col">Grouping</th>
                    <th scope="col">Equipment</th>
                    <th scope="col">Location</th>
                    <th scope="col">Count</th>
                    <th scope="col">Status</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.Grouping}</td>
                      <td>
                        {item.Equipment}
                        {formatMakeModel(item)}
                      </td>
                      <td>{item.Location}</td>
                      <td>{item.Count}</td>
                      <td>{item.Status}</td>
                      <td>{item.Notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      ) : (
        <>
          <h1>Add Equipment</h1>
          <AddEquipment />
        </>
      )}
    </section>
  );
}