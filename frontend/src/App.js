import {Routes,Route} from "react-router";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route exact path="/login" component={<Login/>}/>
                <Route exact path="/register" component={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
