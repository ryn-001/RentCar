import { useEffect, useState } from "react";
import axios from "axios";

export default function BookedCars() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("/api/bookings");
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2 style={styles.title}>Manage <span style={styles.orangeText}>Bookings</span></h2>
                <p style={styles.subtitle}>Viewing all current car reservations</p>
            </header>

            <div style={styles.grid}>
                {bookings.map((b) => (
                    <div key={b._id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.carModel}>{b.car.model}</h3>
                            <span style={styles.badge}>{b.days} Days</span>
                        </div>
                        
                        <div style={styles.infoSection}>
                            <div style={styles.infoRow}>
                                <span style={styles.label}>Customer:</span>
                                <span style={styles.value}>{b.user.email}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.label}>Start Date:</span>
                                <span style={styles.value}>{new Date(b.startDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <button style={styles.detailsBtn}>View Details</button>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <p style={styles.noData}>No bookings found at the moment.</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "40px 20px",
        backgroundColor: "#1a1a1a", // Slightly lighter than nav for contrast
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "sans-serif"
    },
    header: {
        textAlign: "center",
        marginBottom: "40px"
    },
    title: {
        fontSize: "32px",
        margin: "0"
    },
    orangeText: {
        color: "#ff7a00"
    },
    subtitle: {
        color: "#aaa",
        marginTop: "10px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "25px",
        maxWidth: "1200px",
        margin: "0 auto"
    },
    card: {
        backgroundColor: "#262626",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        border: "1px solid #333",
        transition: "transform 0.2s",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #444",
        paddingBottom: "15px",
        marginBottom: "15px"
    },
    carModel: {
        margin: 0,
        fontSize: "20px",
        color: "#ff7a00"
    },
    badge: {
        backgroundColor: "#444",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold"
    },
    infoSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px"
    },
    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px"
    },
    label: {
        color: "#888"
    },
    value: {
        fontWeight: "500"
    },
    detailsBtn: {
        width: "100%",
        backgroundColor: "transparent",
        color: "#fff",
        border: "1px solid #ff7a00",
        padding: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.3s",
        fontWeight: "bold"
    },
    noData: {
        textAlign: "center",
        color: "#666",
        marginTop: "50px"
    }
};