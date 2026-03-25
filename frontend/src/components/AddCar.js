import { useState } from "react";
import axios from "axios";

export default function AddCar() {
    const [car, setCar] = useState({
        model: "",
        number: "",
        capacity: "",
        rent: ""
    });

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/cars", car);
            alert("Car added successfully");
            setCar({ model: "", number: "", capacity: "", rent: "" });
        } catch (err) {
            alert("Error adding car");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Add New Car</h2>

                <input
                    name="model"
                    placeholder="Vehicle Model"
                    value={car.model}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="number"
                    placeholder="Vehicle Number"
                    value={car.number}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="capacity"
                    placeholder="Seating Capacity"
                    value={car.capacity}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="rent"
                    placeholder="Rent per day"
                    value={car.rent}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    Add Car
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f0f"
    },
    form: {
        backgroundColor: "#1a1a1a",
        padding: "30px",
        borderRadius: "12px",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.6)"
    },
    title: {
        color: "#ff7a00",
        textAlign: "center"
    },
    input: {
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #333",
        backgroundColor: "#0f0f0f",
        color: "#fff",
        outline: "none"
    },
    button: {
        padding: "10px",
        backgroundColor: "#ff7a00",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    }
};