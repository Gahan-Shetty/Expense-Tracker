import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("uid", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenses(expenseData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;

    const expenseDate = new Date(expense.date);
    const today = new Date();

    if (filter === "today") {
      return expenseDate.toDateString() === today.toDateString();
    }

    if (filter === "month") {
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="expense-container">
      <h2>Your Expenses</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("today")}>Today</button>
        <button onClick={() => setFilter("month")}>This Month</button>
      </div>

      <div className="total-box">
        Total Expense: ₹{total}
      </div>

      {filteredExpenses.length === 0 && (
        <p>No expenses found.</p>
      )}

      {filteredExpenses.map((expense) => (
        <div key={expense.id} className="expense-card">
          <p>
            {expense.category} - ₹{expense.amount}
          </p>
          <small>
            {new Date(expense.date).toLocaleDateString()}
          </small>

          <br />

          <button
            className="delete-btn"
            onClick={() => handleDelete(expense.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
