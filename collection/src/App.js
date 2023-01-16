import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { GiBoltSpellCast } from "react-icons/gi";

function App() {
  const [account, setAccount] = useState("");

  const initConnection = async () => {
    if (typeof window.ethereum != "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account[0]);
    } else {
      console.log("Please install metamass.");
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <img
          src={require("./assets/images/logo.png")}
          className="artIcon"
          alt=""
        />
        <p>
          5/15
          <span>
            <GiBoltSpellCast style={{marginLeft: "5px"}}/>
          </span>
        </p>
        {account == "" ? (
          <button onClick={initConnection} className="button">
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
    </div>
  );
}

export default App;
