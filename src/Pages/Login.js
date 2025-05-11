import {useState} from "react";
import axios from "axios";
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState("");
    const [snackbar, setSnackbar] = useState({
        open:false,
        message:""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/login", {
                username: formData.username,
                password: formData.password,
            });
            console.log(response);
            const token = response.data.access_token;
            const user_id = response.data.user_id;
            localStorage.setItem("token", token);
            localStorage.setItem("user_id",user_id);
            localStorage.setItem("user", formData.username)
            setError("");
            setSnackbar({
                open: true,
                message:"Login Successfull"
            });
            navigate('/dashboard')
        } catch (err) {
            setError("Invalid username or password");
            setSnackbar({
                open:true,
                message:"Login Failed"
            });
        }
    };

    const handleRegistration = () => {
        navigate('/register');
    };

    return( 
        <>
            <div className="flex flex-col h-screen">
                <div className="h-20 shadow-md py-10 px-4 flex items-center">
                    <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                    Expense Tracker
                    </h1>
                </div>
                <div className="flex flex-1">
                    <div className="flex w-1/2 p-8 justify-center items-center round bg-gradient-to-r from-purple-600 to-yellow-200">
                        <form onSubmit={handleSubmit}>
                            <input className="mb-5 p-3 border rounded" type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
                            <input className="mb-5 p-3 border rounded" type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
                            {error && <p style={{color: "red"}}>{error}</p>}<br />
                            <div className="flex gap-14">
                                <button className="mb-5 p-3 hover: bg-blue-500 border rounded" type="submit"> Login </button>
                                <button className=" mb-5 p-3 hover: bg-blue-400 border rounded" type="button" onClick={handleRegistration}> Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2">
                        <img
                        src="/expense_tracker_logo.png"
                        alt="image Loading"
                        className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({...snackbar, open:false})}
                message={snackbar.message}
                anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
            />   
        </>
    )
};

export default Login;