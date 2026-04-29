import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import VehicleSelect from "../components/VehicleSelect";

export default function FuelEntry() {
  const [vehicleId, setVehicleId] = useState("");
  const [litres, setLitres] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleId || !litres) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "fuel_logs"), {
      vehicle_id: vehicleId,
      litres: Number(litres),
      timestamp: Timestamp.now(),
      filled_by: "Chris",
    });

    alert("Fuel logged!");
    setLitres("");
  };

  return (
    <div className="container">
      <div className="inner-card">
        <div className="title">⛽ Log Fuel</div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Vehicle</label>
            <div className="select-wrapper">
              <VehicleSelect onChange={setVehicleId} />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Litres</label>
            <input
              className="input"
              type="number"
              value={litres}
              onChange={(e) => setLitres(e.target.value)}
              placeholder="Enter litres"
            />
          </div>

          <button className="button" type="submit">
            Save Fuel
          </button>
        </form>
      </div>
    </div>
  );
}
