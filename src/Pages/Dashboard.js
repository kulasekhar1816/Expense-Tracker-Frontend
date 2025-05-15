import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpensePopup from "../Components/ExpensePopup";
import ExpenseList from "../Components/ExpenseList";
import ExpenseChart from "../Components/ExpenseChart";
import DailyLimitPopup from "../Components/DailyLimitPopup";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [dailyLimit, setDailyLimit] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [popup, setPopup] = useState(false);
    const [limitPopup, setLimitPopup] = useState(false);

    const handleSaveLimit  = async (limit) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put("http://localhost:8000/auth/limit", 
                { daily_limit: limit },
                {
                headers: { Authorization: `Bearer ${token}` }
                }
            );
            localStorage.setItem("daily_limit", res.data.daily_limit);
            setDailyLimit(res.data.daily_limit)
            setLimitPopup(false);
            } catch (err) {
            console.error("Failed to update limit", err);
        }
    };

    const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/expenses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExpenses(response.data);
                setTotal(response.data.reduce((sum, item) => sum + item.amount, 0));
                setUser(localStorage.getItem("user"));
                console.log(dailyLimit)
            } catch (err){
                console.log(err)
            }
    };

    useEffect(() => {
        const limit  = localStorage.getItem("daily_limit")
        if(limit == 0){
            setLimitPopup(true);
        }
        setDailyLimit(localStorage.getItem("daily_limit"));
    }, []);

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
            {limitPopup && (
                <DailyLimitPopup onClose={() => setLimitPopup(false)} onSave={(limit) => {handleSaveLimit(limit); setLimitPopup(false); }} />
                
            )}
            <div className="flex flex-col">
                <div className="flex h-20 shadow-md justify-between items-center rounded">
                    <h1 className="px-5 text-4xl leading-relaxed font-bold bg-gradient-to-r from-blue-600 via-teal-300 to-green-300 bg-clip-text text-transparent"> Dashboard</h1>
                    <button className="text-2xl flex bg-blue-500 bg-clip-text text-transparent px-10" type="button" onClick={handleLogout}>Logout</button>
                </div>
                <div className=" flex items-center justify-between h-20 py-10">
                    <h1 className="text-5xl"> Welcome, <span className="font-semibold text-5xl bg-gradient-to-l from-black via-yellow-200 to-red-600 bg-clip-text text-transparent">{user}</span></h1>
                    <div className="flex mb-4 px-10 py-5 text-2xl justify-between items-center">
                        <h1 className=" px-5"> Daily Limit: {dailyLimit}</h1> 
                        <button className="border rounded px-5 bg-blue-500" onClick={() => setLimitPopup(true)}>Edit</button>
                    </div>
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
                        <ExpensePopup
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