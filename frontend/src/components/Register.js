import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/api/users/register", form);
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
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
                <p style={{ color: "#aaa", textAlign: "center", marginBottom: "30px", fontSize: "14px" }}>
                    Create an account to start booking
                </p>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", color: "#eee", marginBottom: "8px", fontSize: "14px" }}>Full Name</label>
                    <input 
                        name="name" 
                        placeholder="John Doe" 
                        onChange={handleChange} 
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #444",
                            backgroundColor: "#1a1a1a",
                            color: "#fff",
                            fontSize: "15px",
                            outline: "none",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", color: "#eee", marginBottom: "8px", fontSize: "14px" }}>Email Address</label>
                    <input 
                        name="email" 
                        type="email"
                        placeholder="name@example.com" 
                        onChange={handleChange} 
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #444",
                            backgroundColor: "#1a1a1a",
                            color: "#fff",
                            fontSize: "15px",
                            outline: "none",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", color: "#eee", marginBottom: "8px", fontSize: "14px" }}>Password</label>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="••••••••" 
                        onChange={handleChange} 
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #444",
                            backgroundColor: "#1a1a1a",
                            color: "#fff",
                            fontSize: "15px",
                            outline: "none",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                <button type="submit" style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#ff7a00",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "10px"
                }}>
                    Register
                </button>
                
                <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                    Already have an account? <Link to="/login" style={{ color: "#ff7a00", textDecoration: "none", fontWeight: "500" }}>Login</Link>
                </p>
            </form>
        </div>
    );
}