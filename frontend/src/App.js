import "./App.css";

// get the Application Binary Interface of our contract
import Token from "./Token.json";

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Sumer } from "sumer-sdk";

const injected = new InjectedConnector({
  supportedChainIds: [5], // support only goerli
});

// The address of our deployed contract
const CONTRACT_ADDR = "0xC43982FE52EE6f25e982e3EE0772fa049428D0a6";

function ConnectMetamask() {
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  if (!active) {
    return (
      <div>
        <button
          onClick={() => {
            activate(injected);
          }}
        >
          Connect Metamask
        </button>
      </div>
    );
  } else if (chainId === 5) {
    return (
      <div>
        User Address: {account}
        <button onClick={deactivate}> disconnect</button>
      </div>
    );
  } else {
    return <div>{alert("please change to the göerli testnet")}</div>;
  }
}

function App() {
  const [amount, setAmount] = useState();
  const [address, setAddress] = useState("");

  const { library: provider } = useWeb3React();
  // send tokens
  async function sendTokens(to, amount) {
    // to create a contract instance we need: contract addr, contract abi and the signer.
    // to use sumer, we also need the sumer key and the chainId
    const contract = Sumer.createWrappedContract(
      CONTRACT_ADDR,
      Token.abi,
      provider.getSigner()
    );

    // now we can use the transfer function of the Token.sol contract
    // the transfer functions needs 2 arguments: address to, and amount
    const tx = await contract.transfer(to, amount);
    await tx.wait();
  }

  // call the transfer function
  const handleTransfer = async (to, amount) => {
    await sendTokens(to, amount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ConnectMetamask />
        <br></br>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount"
        />
        <input
          type="string"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />
        <button
          onClick={() => {
            handleTransfer(address, amount);
          }}
        >
          send tokens
        </button>
      </header>
    </div>
  );
}

export default App;
