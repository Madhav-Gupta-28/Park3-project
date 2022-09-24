import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Qrcode from "./components/QRCode/Qrcode";
import ProposeList from "./components/ProposesList/ProposeList";
import Watchvideo from "./components/watchVideo/Watchvideo";
import { useState, createContext } from "react";
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
} from "@livepeer/react";

export const AppStateContext = createContext(null);

function App() {
  const [login, setlogin] = useState(false);
  const [walletaddress, setwalletaddress] = useState("");
  const [description, setdescription] = useState("");
  const [uploadSucess, setuploadSucess] = useState(false);
  const [proposalData, setproposalData] = useState([]);

  const client = createReactClient({
    provider: studioProvider({
      apiKey: "6a234aef-9c9c-41a1-82ba-948e33476fa2",
    }),
  });

  return (
    <>
      <LivepeerConfig client={client}>
        <AppStateContext.Provider
          value={{
            login,
            setlogin,
            walletaddress,
            setwalletaddress,
            description,
            setdescription,
            uploadSucess,
            setuploadSucess,
            proposalData,
            setproposalData,
          }}
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/qrcode" element={<Qrcode />} />
              <Route exact path="/list" element={<ProposeList />} />
              <Route exact path="/watchvideo" element={<Watchvideo />} />
            </Routes>
          </Router>
        </AppStateContext.Provider>
      </LivepeerConfig>
    </>
  );
}

export default App;
