import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Snackbar } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });
    const [formData, setFormData] = useState({
        "username":"",
        "email":"",
        "password":""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/register", {
                username: formData.username,
                password: formData.password,
                email: formData.email,
            });
            console.log("Registeration Successful");
            setSnackbar({
            open: true,
            message: "User Registered"
            });
            setTimeout(() => navigate("/login"), 1500); // Delay navigation to show snackbar
            } catch (error) {
            setSnackbar({
                open: true,
                message: "Registration failed. Please try again."
            });
            console.error("Registration error:", error.response?.data || error.message);
            }

    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="h-20 shadow-md py-10 px-4 flex items-center">
                    <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-purple-600 to-yellow-200 bg-clip-text text-transparent">
                    Register
                    </h1>
                </div>
                <div className="flex flex-1">
                    <div className="flex w-1/2 p-8 justify-center items-center round bg-gradient-to-r from-green-400 to-blue-600">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" className="mb-5 p-3 border rounded" placeholder="Username" value={formData.username} onChange={handleChange} required /> <br />
                            <input type="email" name="email" className="mb-5 p-3 border rounded" placeholder="Email" value={formData.email} onChange={handleChange} required /> <br />
                            <input type="password" name="password" className="mb-5 p-3 border rounded" placeholder="Password" value={formData.password} onChange={handleChange} required /> <br />
                            <button type="submit" className="mb-5 p-3 bg-blue-400 border rounded"> Register</button>
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
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
            />
        </>
    );

};

export default Register;