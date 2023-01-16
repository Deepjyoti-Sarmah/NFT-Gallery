import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState();

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

  return (
    <div>
      <button onClick={initConnection}>Connect</button>
      <p>{account}</p>
    </div>
  );
}

export default App;
