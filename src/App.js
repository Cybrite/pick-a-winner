import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manager: "",
    };
  }
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    web3.eth.getAccounts().then(console.log);

    return (
      <div>
        <h2>lottery contract</h2>
        <h3>this contract managed by {this.state.manager}</h3>
      </div>
    );
  }
}
export default App;
