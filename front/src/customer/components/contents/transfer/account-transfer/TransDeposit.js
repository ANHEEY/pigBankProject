// 계좌이체
import React, {Component} from "react";
import Account from "../transfer-service/Accounts";



class TransDeposit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      message: null,
    };
  }

  move = (trans) => {
    this.setState({
      data: trans,
    })
  }

  render() {
    return (
      <>
        <Account onData={this.move}/>
      </>          
        )
    }
}

export default TransDeposit;