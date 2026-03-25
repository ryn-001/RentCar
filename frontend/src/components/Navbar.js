import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <span style={styles.logoBlack}>Rent</span>
                <span style={styles.logoOrange}>Car</span>
            </div>

            <div style={styles.links}>
                {user?.role === "admin" && (
                    <>
                        <Link to="/add-car" style={styles.link}>Add Car</Link>
                        <Link to="/booked" style={styles.link}>Bookings</Link>
                    </>
                )}
            </div>

            <div style={styles.auth}>
                {!user ? (
                    <>
                        <Link to="/login" style={styles.loginBtn}>Login</Link>
                        <Link to="/register" style={styles.registerBtn}>Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        backgroundColor: "#0f0f0f",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold"
    },
    logoBlack: {
        color: "#ffffff"
    },
    logoOrange: {
        color: "#ff7a00"
    },
    links: {
        display: "flex",
        gap: "20px"
    },
    link: {
        textDecoration: "none",
        color: "#fff",
        fontSize: "15px"
    },
    auth: {
        display: "flex",
        gap: "10px"
    },
    loginBtn: {
        backgroundColor: "transparent",
        color: "#fff",
        padding: "6px 14px",
        borderRadius: "6px",
        textDecoration: "none",
        border: "1px solid #fff"
    },
    registerBtn: {
        backgroundColor: "#ff7a00",
        color: "#fff",
        padding: "6px 14px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "500"
    },
    logoutBtn: {
        backgroundColor: "#ff7a00",
        color: "#fff",
        border: "none",
        padding: "6px 14px",
        borderRadius: "6px",
        cursor: "pointer"
    }
};