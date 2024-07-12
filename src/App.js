import "./App.css";
import React from "react";
import web3 from "./web3";

class App extends React.Component {
  render() {
    web3.eth.getAccounts().then(console.log);

    return (
      <div className="App">
        <h1>Hello!</h1>
      </div>
    );
  }
}
export default App;
