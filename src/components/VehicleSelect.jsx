import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function VehicleSelect({ onChange }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const querySnapshot = await getDocs(collection(db, "vehicles"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setVehicles(data);
    }

    fetchVehicles();
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Vehicle</option>
      {vehicles.map(v => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}
    </select>
  );
}