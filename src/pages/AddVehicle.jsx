import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AddVehicle() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      await addDoc(collection(db, "vehicles"), {
        name: name.trim(),
        type: type.trim() || "unknown",
        created_at: new Date(),
      });

      setName("");
      setType("");
      setSuccess("✅ Vehicle added successfully");
    } catch (err) {
      console.error(err);
      setSuccess("❌ Error adding vehicle");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">🚜 Add Vehicle</div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Vehicle Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tractor T5"
            />
          </div>

          <div className="input-group">
            <label className="label">Vehicle Type</label>
            <input
              className="input"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="tractor, bakkie, generator"
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Saving..." : "Save Vehicle"}
          </button>

          {success && <div className="success">{success}</div>}
        </form>
      </div>
    </div>
  );
}
