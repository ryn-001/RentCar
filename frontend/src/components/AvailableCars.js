import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AvailableCars() {
    const [cars, setCars] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            const res = await axios.get("/api/cars");
            setCars(res.data);
        };
        fetchCars();
    }, []);

    const handleRent = async (carId, days, startDate) => {
        if (!user) return navigate("/login");

        if (user.role === "admin") {
            alert("Admins cannot book cars");
            return;
        }

        try {
            await axios.post("/api/book", {
                carId,
                days,
                startDate
            });
            alert("Car booked successfully");
        } catch (err) {
            alert("Booking failed");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Available Cars</h2>

            <div style={styles.grid}>
                {cars.map((car) => (
                    <CarCard key={car._id} car={car} user={user} handleRent={handleRent} />
                ))}
            </div>
        </div>
    );
}

function CarCard({ car, user, handleRent }) {
    const [days, setDays] = useState(1);
    const [date, setDate] = useState("");

    return (
        <div style={styles.card}>
            <h3 style={styles.model}>{car.model}</h3>
            <p style={styles.text}>{car.number}</p>
            <p style={styles.text}>{car.capacity} seats</p>
            <p style={styles.price}>₹{car.rent}/day</p>

            {user?.role === "customer" && (
                <div style={styles.inputs}>
                    <select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        style={styles.select}
                    >
                        <option value={1}>1 day</option>
                        <option value={2}>2 days</option>
                        <option value={3}>3 days</option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={styles.date}
                    />
                </div>
            )}

            <button
                style={styles.button}
                onClick={() => handleRent(car._id, days, date)}
            >
                Rent Car
            </button>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        padding: "30px",
        color: "#fff"
    },
    title: {
        textAlign: "center",
        color: "#ff7a00",
        marginBottom: "30px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
    },
    card: {
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    model: {
        color: "#ff7a00"
    },
    text: {
        color: "#ccc"
    },
    price: {
        color: "#fff",
        fontWeight: "bold"
    },
    inputs: {
        display: "flex",
        gap: "10px"
    },
    select: {
        flex: 1,
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #333",
        backgroundColor: "#0f0f0f",
        color: "#fff"
    },
    date: {
        flex: 1,
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #333",
        backgroundColor: "#0f0f0f",
        color: "#fff"
    },
    button: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#ff7a00",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold"
    }
};