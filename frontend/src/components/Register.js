import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {config} from "../config"
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${config.endpoint}/users/register`, {
                fullname: form.fullname,
                username: form.username,
                email: form.email,
                password: form.password
            });
            toast.success("Registration successful");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            toast.error("Registration failed");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            backgroundColor: "#1a1a1a",
            padding: "20px",
            fontFamily: "sans-serif"
        }}>
            <ToastContainer />
            <form onSubmit={handleSubmit} style={{
                backgroundColor: "#262626",
                padding: "40px",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                border: "1px solid #333"
            }}>
                <h2 style={{ color: "#fff", fontSize: "28px", marginBottom: "10px", textAlign: "center" }}>
                    Join <span style={{ color: "#ff7a00" }}>RentCar</span>
                </h2>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: "#eee" }}>Full Name</label>
                    <input name="fullname" onChange={handleChange} required style={inputStyle}/>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: "#eee" }}>Username</label>
                    <input name="username" onChange={handleChange} required style={inputStyle}/>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: "#eee" }}>Email</label>
                    <input type="email" name="email" onChange={handleChange} required style={inputStyle}/>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: "#eee" }}>Password</label>
                    <input type="password" name="password" onChange={handleChange} required style={inputStyle}/>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ color: "#eee" }}>Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required style={inputStyle}/>
                </div>

                <button type="submit" style={buttonStyle}>
                    Register
                </button>

                <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#ff7a00" }}>Login</Link>
                </p>
            </form>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    marginTop: "5px",
    outline: "none"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff7a00",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
};