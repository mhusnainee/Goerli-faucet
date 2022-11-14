// import MetaMask from "./images/MetaMask.png";
import Ethereum from "./images/Ethereum.png";
import { useState } from "react";
import "./App.css";
import abi from "./contracts/faucetABI.json";
import Web3 from "web3";

function App() {
  const provider = new Web3(
    "https://eth-goerli.g.alchemy.com/v2/lX5amFLIWvEkYFbNiu4WosLcQcb-6ILb"
  );
  const faucet = new provider.eth.Contract(
    abi,
    "0xC8eeB7608a72fD1F8B5Ac5A3789B6aBfe4C33A06"
  );
  const [wallet, setWallet] = useState("");
  const [hash, setHash] = useState("");
  // https://goerli.etherscan.io/tx/0xc4aba7baa01e789be7c334805a234552a058b7e7d1a7743389985d31c5dcf440
  // 0.001 = 38D7EA4C68000
  // 0.005 = 11C37937E08000

  const connect = async () => {
    const currentAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(currentAddress);
    return currentAddress;
  };

  const requestTx = async () => {
    const param = {
      to: "0xa22FC2bF530e2e73199B9A9Ec917f0b7176f8C7B",
      from: window.ethereum.selectedAddress,
      data: faucet.methods.request().encodeABI(),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [param],
    });

    setHash(`https://goerli.etherscan.io/tx/${txHash}`);
  };

  const fundTx = async () => {
    const param = {
      to: "0xa22FC2bF530e2e73199B9A9Ec917f0b7176f8C7B",
      from: window.ethereum.selectedAddress,
      value: "38D7EA4C68000",
      data: faucet.methods.fund().encodeABI(),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [param],
    });
    setHash(`https://goerli.etherscan.io/tx/${txHash}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="web">Request 0.01 Goerli Ethers</p>
        {
          <button className="connect">
            <button className="inside" onClick={connect}>
              Connect Wallet
            </button>
          </button>
        }
        <p className="address">
          Connected address: {wallet ? wallet : "Please connect metamask"}
        </p>
        {/* <img src={MetaMask} className="metamask" alt="MetaMask logo" /> */}
        <button className="container">
          <br></br>
          <img src={Ethereum} className="ethereum" alt="MetaMask logo" />
          <br></br>
          <br></br>
          <button className="request" onClick={requestTx}>
            Request Ethers
          </button>
          <br></br>
          <br></br>
          <button className="fund" onClick={fundTx}>
            Send 0.001 Ethers
          </button>
          <br></br>
        </button>

        <a className="address" href={hash} target="_blank" rel="noreferrer">
          Check your transaction on Etherscan
        </a>
        <br></br>
        <footer>
          <p className="copyright">Copyright © 2022 Synapsify.</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
