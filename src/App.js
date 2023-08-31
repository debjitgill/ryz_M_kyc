import "./App.css";
import KYC from "./kyc/index";
import ADMIN from "./admin";
import Logo from "./assets/ryzmainlogo.png";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
function App() {
  const getAdminKey = () => {
    let data = sessionStorage.getItem("adminKey");
    if (data) {
      sessionStorage.removeItem("token");
      return true;
    }
    return false;
  };
  const [isAdminLogin, setIsAdminLogin] = useState(getAdminKey());
  useEffect(() => {}, []);
  return (
    <div className="App p-8 global-bg">
      <header className="App-header flex flex-col justify-center items-center">
        <div className="flex gap-8 mb-4">
          <img width={"100px"} src={Logo} alt="RYZ" />{" "}
          {!isAdminLogin && (
            <Button
              color="success"
              variant="contained"
              onClick={() => setIsAdminLogin(true)}
            >
              ADMIN LOGIN
            </Button>
          )}
        </div>
        <span className="font-bold">RYZ KYC</span>
      </header>
      {!isAdminLogin && <KYC />}
      {isAdminLogin && <ADMIN />}
    </div>
  );
}

export default App;
