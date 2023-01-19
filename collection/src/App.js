import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { GiBoltSpellCast } from "react-icons/gi";
import abi from "./abi/abi.json";
import data from "./data/data.json";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [nfts, setNfts] = useState(data);

  const balance = async () => {
    const contract = new ethers.Contract(
      "0xa27d1cedf3aecb7c88358caaaf4a27301e1f1a43",
      abi,
      provider
    );
    const tempBalance = contract.balanceOf(
      "0x18992684FBeEEd5A61B48610fec6137a924cBC98"
    );
  };

  const initConnection = async () => {
    if (typeof window.ethereum != "undefined") {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
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
            <GiBoltSpellCast style={{ marginLeft: "5px" }} />
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
      <div className="main">
        {nfts.list.map((nft, index) => {
          return (
            <div key={index} className="card">
              <div style={{ position: "relative" }}>
                <a target={"_blank"} href= {`https://opensea.io/collection/${nft.link}`}></a>
                <img
                  className="cardImage"
                  src={require("./assets/images/opensea-logo.png")}
                  alt=""
                />
              </div>
              <img
                className="nftImage"
                src={require(`./assets/images/${nft.id}.${nft.type}`)}
                alt=""
              />
              <p className="nftText">{nft.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
