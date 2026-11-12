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

  // location and category consts
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // vars for column sorting
  const [sortField, setSortField] = useState("Grouping");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    // asynch get from supabase
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

  // find location
  const locationOptions = [
    "All",
    ...new Set(
      items
        .map((item) => item.Location)
        .filter((loc) => Boolean(loc) && typeof loc === "string")
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)));

  // find grouping
  const categoryOptions = [
    "All",
    ...new Set(
      items
        .map((item) => item.Grouping)
        .filter((cat) => Boolean(cat) && typeof cat === "string")
    ),
  ].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)));

  // filter items based on selection of dropdowns
  const filteredItems = items.filter((item) => {
    const matchesLocation =
      selectedLocation === "All" || item.Location === selectedLocation;
    const matchesCategory =
      selectedCategory === "All" || item.Grouping === selectedCategory;
    return matchesLocation && matchesCategory;
  });

  // header clicks
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Finding weight
  const getSortOrderWeight = (val) => {
    const trimmed = String(val || "").trim();
    if (trimmed === "") return 2;
    const firstChar = trimmed[0];
    if (/^[a-zA-Z]$/.test(firstChar)) {
      return 0;
    }
    return 1;
  };

  // sort via custom sorting
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // direction
    const dir = sortDirection === "asc" ? 1 : -1;

    // check for blank and adjust
    const isEmptyA = valA === null || valA === undefined || String(valA).trim() === "";
    const isEmptyB = valB === null || valB === undefined || String(valB).trim() === "";

    if (isEmptyA && isEmptyB) return 0;
    if (isEmptyA) return 1 * dir;
    if (isEmptyB) return -1 * dir;

    // numeric sorting for count column
    if (sortField === "Count") {
      const numA = Number(valA) || 0;
      const numB = Number(valB) || 0;
      return (numA - numB) * dir;
    }

    // weight for custom sort
    const weightA = getSortOrderWeight(valA);
    const weightB = getSortOrderWeight(valB);

    if (weightA !== weightB) {
      return (weightA - weightB) * dir;
    }

    // Sorting for text columns
    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    const comp = strA.localeCompare(strB);
    return comp * dir;
  });

  // reset to default
  const handleClearFilters = () => {
    setSelectedLocation("All");
    setSelectedCategory("All");
  };

  if (loading && page === "list") return <p>Loading equipment...</p>;
  if (error && page === "list") return <p role="alert">Could not load equipment: {error}</p>;

  return (
    <section className="equipment-panel">
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

            {/* filter controls */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "15px",
              }}
            >
              {/* location filter dropdown selector */}
              <div>
                <label htmlFor="location-filter" style={{ marginRight: "6px", fontFamily: "var(--font-mono)" }}>
                  Location:
                </label>
                <select
                  id="location-filter"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{ padding: "6px 10px", borderRadius: "4px" }}
                >
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All locations" : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* category filter dropdown selector  */}
              <div>
                <label htmlFor="category-filter" style={{ marginRight: "6px", fontFamily: "var(--font-mono)" }}>
                  Category:
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ padding: "6px 10px", borderRadius: "4px" }}
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear */}
              <button
                className="btn"
                onClick={handleClearFilters}
                style={{ padding: "6px 12px" }}
              >
                Clear filters
              </button>
            </div>

            {/* No equipment matches these filters. */}
            {sortedAndFilteredItems.length === 0 ? (
              <p>No equipment matches these filters.</p>
            ) : (
              <div className="equipment-table-scroll">
                <table className="equipment-table">
                  <thead>
                    <tr>
                      {/* Grouping sort */}
                      <th scope="col" onClick={() => handleSort("Grouping")} style={{ cursor: "pointer" }}>
                        Grouping {sortField === "Grouping" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                      </th>
                      {/* Equipment sort */}
                      <th scope="col" onClick={() => handleSort("Equipment")} style={{ cursor: "pointer" }}>
                        Equipment {sortField === "Equipment" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                      </th>
                      {/* Location sort clickable for sort */}
                      <th scope="col" onClick={() => handleSort("Location")} style={{ cursor: "pointer" }}>
                        Location {sortField === "Location" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                      </th>
                      {/* header for count */}
                      <th scope="col" onClick={() => handleSort("Count")} style={{ cursor: "pointer" }}>
                        Count {sortField === "Count" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                      </th>
                      {/* Statuc sort, clickable */}
                      <th scope="col" onClick={() => handleSort("Status")} style={{ cursor: "pointer" }}>
                        Status {sortField === "Status" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                      </th>
                      {/* Notes is static */}
                      <th scope="col">Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* maps over sorted / filtered items. */}
                    {sortedAndFilteredItems.map((item) => (
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
            )}
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