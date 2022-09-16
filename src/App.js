import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { useState, createContext } from "react";

export const AppStateContext = createContext(null);

function App() {
  const [login, setlogin] = useState(false);
  const [walletaddress, setwalletaddress] = useState("");
  return (
    <>
      <AppStateContext.Provider
        value={{ login, setlogin, walletaddress, setwalletaddress }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            {/* <Route path="/movies/:id" element={<Movie />} /> */}
          </Routes>
        </Router>
      </AppStateContext.Provider>
    </>
  );
}

export default App;
