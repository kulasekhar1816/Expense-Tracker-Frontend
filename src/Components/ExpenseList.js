import React, { useState } from "react";
import axios from "axios";
import { Snackbar } from '@mui/material';
import ExpensePopup from "./ExpensePopup";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [expenseToEdit, setExpenseToEdit] = useState({});
  const [editExp, setEditExp] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });

  // Group expenses by date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(expense);
    return acc;
  }, {});
  console.log(groupedExpenses)

  // Sort dates (newest first)
  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b) - new Date(a)
  );


  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenseToEdit(response.data);
      handleOpen(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbar({ open: true, message: "Expense Deleted" });
      onDelete();
    } catch {
      setSnackbar({ open: true, message: "Failed to Delete Expense" });
    }
  };

  const handleOpen = (id) => setEditExp(id);
  const handleClose = () => {
    setEditExp("");
    onEdit();
  };

  return (
    <>
      <div className="mt-6 space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <table className="w-full border border-gray-300 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedExpenses[date].map((expense) => (
                  <tr key={expense.id} className="border-t">
                    <td className="p-2">{expense.title}</td>
                    <td className="p-2">₹{expense.amount}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-600 mr-2"
                        onClick={() => handleEdit(expense.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Edit Expense Modal */}
      {editExp && (
            <ExpensePopup
              name="Edit"
              expenseToEdit={expenseToEdit}
              expense_id={editExp}
              onClose={handleClose}
            />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default ExpenseList;
