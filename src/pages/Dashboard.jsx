import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import FuelEntry from "./../pages/FuelEntry";
import AddVehicle from "./../pages/AddVehicle";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  const [totalToday, setTotalToday] = useState(0);
  const [perVehicle, setPerVehicle] = useState({});

  // ✅ MOVE helper OUTSIDE useEffect
  const getVehicleName = (vehicleId) => {
    if (!vehiclesLoaded) return "Loading...";
    return vehicles[vehicleId] || "Unknown Vehicle";
  };

  useEffect(() => {
    // 🔁 VEHICLES
    const unsubscribeVehicles = onSnapshot(
      collection(db, "vehicles"),
      (snapshot) => {
        const vMap = {};
        snapshot.docs.forEach((doc) => {
          vMap[doc.id] = doc.data().name;
        });
        setVehicles(vMap);
        setVehiclesLoaded(true);
      },
    );

    // 🔁 FUEL LOGS
    const q = query(collection(db, "fuel_logs"), orderBy("timestamp", "desc"));

    const unsubscribeLogs = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(data);

      const today = new Date().toDateString();
      let total = 0;
      const vehicleTotals = {};

      data.forEach((log) => {
        const date = log.timestamp?.toDate?.()?.toDateString();

        if (date === today) {
          total += log.litres || 0;
        }

        if (!vehicleTotals[log.vehicle_id]) {
          vehicleTotals[log.vehicle_id] = 0;
        }

        vehicleTotals[log.vehicle_id] += log.litres || 0;
      });

      setTotalToday(total);
      setPerVehicle(vehicleTotals);
    });

    return () => {
      unsubscribeVehicles();
      unsubscribeLogs();
    };
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div>
          <img src="/logo.png" alt="Spottr Logo" className="logo" />
        </div>
        <div className="title">Dashboard</div>
        <div className="form-row">
          <div className="form-col">
            <AddVehicle />
          </div>

          <div className="form-col">
            <FuelEntry />
          </div>
        </div>
      </div>

      {/* Total Today */}
      <div className="card">
        <div className="title">Total Fuel Today</div>
        <div className="metric">{totalToday} L</div>
      </div>

      <div className="form-row">
        <div className="form-col">
          {/* Per Vehicle */}
          <div className="card">
            <div className="title">Fuel per Vehicle</div>

            {Object.keys(perVehicle).length === 0 ? (
              <p>No data yet</p>
            ) : (
              Object.entries(perVehicle)
                .sort((a, b) => b[1] - a[1])
                .map(([vehicleId, litres]) => (
                  <div key={vehicleId} className="list-item">
                    <div className="vehicle-name">
                      {getVehicleName(vehicleId)}
                    </div>
                    <div className="litres">{litres} L</div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="form-col">
          {/* Logs */}
          <div className="card">
            <div className="title">Recent Logs</div>

            {logs.length === 0 ? (
              <p>No logs yet</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="list-item">
                  <div className="vehicle-name">
                    {getVehicleName(log.vehicle_id)}
                  </div>
                  <div className="litres">{log.litres} L</div>
                  <div className="timestamp">
                    {log.timestamp?.toDate
                      ? log.timestamp.toDate().toLocaleString()
                      : "No timestamp"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
