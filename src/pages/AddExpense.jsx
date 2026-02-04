import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");

  const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = category === "Other" ? customCategory : category;

    await addDoc(collection(db, "expenses"), {
      amount,
      category: finalCategory,
      date: new Date().toISOString(),
      uid: auth.currentUser.uid,
    });

    setAmount("");
    setCustomCategory("");
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {category === "Other" && (
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        )}

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
