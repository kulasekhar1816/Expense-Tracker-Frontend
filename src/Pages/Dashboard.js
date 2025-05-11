import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddExpense from "../Components/AddExpense";
import ExpenseList from "../Components/ExpenseList";
import ExpenseChart from "../Components/ExpenseChart";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [popup, setPopup] = useState(false);

    const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.get("https://expense-tracker-backend-xy4h.onrender.com/expenses/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExpenses(response.data);
                setTotal(response.data.reduce((sum, item) => sum + item.amount, 0));
                setUser(localStorage.getItem("user"));
            } catch (err){
                console.log(err)
            }
    };

    useEffect(() => {
        fetchExpenses();
    }, [popup]);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleOpen = () => setPopup(true);
    const handleClose = () => setPopup(false);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex h-20 shadow-md items-center justify-between rounded">
                    <h1 className="px-5 text-4xl leading-relaxed font-bold bg-gradient-to-r from-blue-600 via-teal-300 to-green-300 bg-clip-text text-transparent"> Dashboard</h1>
                    <button className="text-2xl flex bg-blue-500 bg-clip-text text-transparent px-10" type="button" onClick={handleLogout}>Logout</button>
                </div>
                <div className=" flex items-center justify-start h-20 flex-col text-5xl py-10">
                    <h1> Welcome, <span className="font-semibold bg-gradient-to-l from-black via-yellow-200 to-red-600 bg-clip-text text-transparent">{user}</span></h1>
                </div>
                <div className="flex flex-col p-5 text-2xl space-y-8">
                    <div className="flex flex-row justify-between items-start space-y-10 md:space-y-10">
                        <div className="flex flex-col w-1/2 space-y-10 py-[10rem]">
                            <h1 className=" mb-4"> Total Expenses: ₹{total}</h1>
                            <button className="mb-4 p-2 bg-green-500  w-1/5 text-white rounded" onClick={handleOpen}>
                            Add Expense</button>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <ExpenseChart data={expenses} />
                        </div>
                    </div>
                    {popup && (
                        <AddExpense
                            name='Add New'
                            onClose={handleClose}
                        />
                    )}
                    <ExpenseList expenses={expenses} onDelete={fetchExpenses} onEdit={fetchExpenses}/>
                </div>
            </div>
        </>
    )

};

export default Dashboard;
