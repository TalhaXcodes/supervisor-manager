import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const AddSupervisor = () => {
  const [form, setForm] = useState({ name: "", domain: "", slots: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "supervisors"), form);
      alert("Supervisor added");
    } catch (err) {
      console.error("Error adding supervisor:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Domain"
        onChange={(e) => setForm({ ...form, domain: e.target.value })}
      />
      <input
        type="number"
        placeholder="Slots"
        onChange={(e) => setForm({ ...form, slots: Number(e.target.value) })}
      />
      <button type="submit">Add Supervisor</button>
    </form>
  );
};

export default AddSupervisor;
