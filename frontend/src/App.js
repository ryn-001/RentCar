import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import BookedCars from "./components/BookedCars"; 
import AddCar from "./components/AddCar";
import AvailableCars from "./components/AvailableCars";

function App() {
    return (
        <div className="App" style={{ backgroundColor: "#1a1a1a", minHeight: "100vh" }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<AvailableCars/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/booked" element={<BookedCars />} />
                <Route path="/add-car" element={<AddCar />} />
                
                <Route path="*" element={<div style={{color: 'white', textAlign: 'center', padding: '50px'}}><h2>404 - Page Not Found</h2></div>} />
            </Routes>
        </div>
    );
}

export default App;