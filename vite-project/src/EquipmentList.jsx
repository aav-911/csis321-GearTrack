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
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} - {item.location}
        </li>
      ))}
    </ul>
  );
}
