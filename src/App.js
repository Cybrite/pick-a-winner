import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "you have been entered!" });
  };

  handlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "drawing the lottery...." });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "a winner has been picked!" });
  };

  render() {
    web3.eth.getAccounts().then(console.log);

    return (
      <div>
        <h2>lottery contract</h2>
        <h3>this contract managed by Sybrite!</h3>
        <p>
          there are currenlty {this.state.players.length} player competitng to
          win {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>

        <hr />

        <form onSubmit={this.handleSubmit}>
          <h4>Want to try your luck?</h4>
          <s>you need at least of 0.011 ether to enter</s>
          <br />
          <div>
            <label>amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <br />
        <b>{this.state.message}</b>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <s>you have to be the manager</s>
        <br />
        <button onClick={this.handlePickWinner}>
          <b>Pick a winner!</b>
        </button>

        <b>{this.state.message}</b>
      </div>
    );
  }
}
export default App;
