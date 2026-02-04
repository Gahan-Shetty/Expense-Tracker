import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Expense Tracker Dashboard
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <AddExpense />
        <ExpenseList />
      </div>
    </div>
  );
}

export default Dashboard;
