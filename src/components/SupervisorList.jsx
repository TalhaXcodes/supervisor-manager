import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const SupervisorList = () => {
  const [supervisors, setSupervisors] = useState([]);

  // Fetch all supervisors
  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "supervisors"));
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setSupervisors(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update supervisor slot
  const updateSlots = async (id, newSlots) => {
    try {
      await updateDoc(doc(db, "supervisors", id), { slots: newSlots });
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete supervisor
  const deleteSupervisor = async (id) => {
    try {
      await deleteDoc(doc(db, "supervisors", id));
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <h2>Supervisor List</h2>
      {supervisors.length === 0 ? (
        <p>No supervisors found.</p>
      ) : (
        supervisors.map((sup) => (
          <div key={sup.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{sup.name}</h3>
            <p>Domain: {sup.domain}</p>
            <p>Slots: {sup.slots}</p>
            <button onClick={() => updateSlots(sup.id, sup.slots + 1)}>➕ Increase</button>
            <button onClick={() => updateSlots(sup.id, Math.max(sup.slots - 1, 0))}>➖ Decrease</button>
            <button onClick={() => deleteSupervisor(sup.id)} style={{ color: "red" }}>🗑️ Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SupervisorList;
