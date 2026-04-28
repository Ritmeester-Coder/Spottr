import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddVehicle() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Vehicle name required");
      return;
    }

    await addDoc(collection(db, "vehicles"), {
      name,
      type: type || "unknown",
      created_at: new Date(),
    });

    alert("Vehicle added!");

    setName("");
    setType("");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>➕ Add Vehicle</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>Name</label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tractor T5"
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Type</label>
            <br />
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="tractor, bakkie, generator"
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <button type="submit" style={{ padding: 10, width: "100%" }}>
            Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
