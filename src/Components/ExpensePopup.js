import {useEffect, useState} from "react";
import axios from "axios"
import { Snackbar } from "@mui/material";

function ExpensePopup({name, expenseToEdit=null, expense_id=null, onClose}) {
    const [snackbar, setSnackbar] = useState({
        open:false,
        message:""
    })
    const [expData, SetExpData] = useState({
        title:"",
        amount:0,
        category:"",
        owner_id:localStorage.getItem("user_id")
    });

    const handleChange = (e) => {
        SetExpData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (expenseToEdit) {
                await axios.put(`http://localhost:8000/expenses/${expense_id}`, expData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSnackbar({
                open:true,
                message:`${expData.title} modified successfully`
            });
            onClose();
            } else {
                await axios.post("http://localhost:8000/expenses", expData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSnackbar({
                open:true,
                message:`${expData.title} added successfully`
            });
            }
            
            SetExpData({
                title:"",
                amount:0,
                category:"",
                owner_id:localStorage.getItem("user_id")
            })
        } catch (err) {
            console.error(err);
            setSnackbar({
                open:true,
                message:`Failed to add expense`
            });
        }
    };


    useEffect(() => {
        if (expenseToEdit) {
            SetExpData({...expenseToEdit, owner_id: localStorage.getItem("user_id")});
        }
    }, [expenseToEdit])

    return(
        <>{(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-3 text-gray-700 text-xl font-bold"
                    >
                        &times;
                    </button>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">{`${name} Expense`}</h2>
                        <input type="text" name="title" placeholder="Title" value={expData.title} onChange={handleChange} className="w-full border p-2 mb-4 rounded" required /> <br />
                        <input type="number" name="amount" placeholder="Amount" value={expData.amount} onChange={handleChange} className="w-full border p-2 mb-4 rounded" required /> <br />
                        <input type="text" name="category" placeholder="Category" value={expData.category} onChange={handleChange} className="w-full border p-2 mb-4 rounded" required /> <br />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            {`${name} Expense`}</button> 
                    </form>
                
                </div>
            </div>

        )}
        
        <Snackbar 
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({...snackbar, open:false})}
            message={snackbar.message}
            anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
        />
        </>

    );
};

export default ExpensePopup;