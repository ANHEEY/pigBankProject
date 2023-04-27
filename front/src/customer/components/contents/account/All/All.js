// 전체조회
import React, { Component} from "react";
import '../../../../resources/css/AllStyle.css';
import AllDeposit from "./AllDeposit";
import AllSaving from "./AllSaving";
import AllLoan from "./AllLoan";
import AllAccount from "./AllAccount";
import Form from 'react-bootstrap/Form';



class All extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            depositChecked: false,
            savingChecked: false,
            loanChecked: false,
            accountChecked: false,
        };
    }

    handleDepositCheckboxChange = (event) => {
        this.setState({
            depositChecked: event.target.checked,
        });
      };
    
      handleSavingCheckboxChange = (event) => {
        this.setState({
            savingChecked: event.target.checked,
        });
      };
    
      handleLoanCheckboxChange = (event) => {
        this.setState({
            loanChecked: event.target.checked,
        });
      };

      handleAccountCheckboxChange = (event) => {
        this.setState({
            accountChecked: event.target.checked,
        });
      };


    

      render(){               
        

        return (
        <div className="container">
          <h2>전체계좌 조회</h2>
            <main className="main">

            <section>
           
            <Form>
            <div classname="container1" style={{
            display: "flex",
            alignItems: "center",
            
            border: "groove",
            borderWidth: "2px 2px 2px 2px",
            width: "450px",
            height: "50px",
            marginLeft: "10", // 추가된 스타일
            padding: "1rem" // 추가된 스타일
          }}>
                
                <h5 style={{marginRight:"1rem"}}>검색조건 : </h5>
                
                <Form.Check inline>
                  <Form.Check.Input 
                      type="checkbox"
                      checked={this.state.loanChecked}
                      onChange={this.handleLoanCheckboxChange}/>
                  
                  <Form.Check.Label>입출금</Form.Check.Label>
                </Form.Check>
                

                <Form.Check inline>
                  <Form.Check.Input 
                      type="checkbox"
                      checked={this.state.depositChecked}
                      onChange={this.handleDepositCheckboxChange}/>
                  
                  <Form.Check.Label>예금</Form.Check.Label>
                </Form.Check>

                <Form.Check inline>
                  <Form.Check.Input 
                      type="checkbox"
                      checked={this.state.savingChecked}
                      onChange={this.handleSavingCheckboxChange}/>
                  
                  <Form.Check.Label>적금</Form.Check.Label>
                </Form.Check>

                <Form.Check inline>
                  <Form.Check.Input 
                      type="checkbox"
                      checked={this.state.loanChecked}
                      onChange={this.handleLoanCheckboxChange}/>
                  
                  <Form.Check.Label>대출</Form.Check.Label>
                </Form.Check>
                
            </div>
            </Form>
            
            </section>

            <section className="section">
            
            {(!this.state.depositChecked &&
            !this.state.savingChecked &&
            !this.state.accountChecked &&
            !this.state.loanChecked) ||
              this.state.accountChecked ? (

                <div className="account_card" >
                    <div>
                        <h4>입출금계좌</h4>
                        <AllAccount />

                        
                        
                    </div>
                </div>

            ) :null}
            
            </section>
            
            <section className="section">
            
            {(!this.state.depositChecked &&
            !this.state.savingChecked &&
            !this.state.accountChecked &&
            !this.state.loanChecked) ||
              this.state.depositChecked ? (

                <div className="account_card" >
                    <div>
                        <h4>예금계좌</h4>
                        <AllDeposit />

                        {/* <button className="button-link active">
                            <Link to="/customer/account/Deposit">계좌조회</Link>
                        </button> */}
                        
                    </div>
                </div>

            ) :null}
            
            </section>

            <section className="section">
            {(!this.state.depositChecked &&
              !this.state.savingChecked &&
              !this.state.accountChecked &&
              !this.state.loanChecked) ||
              this.state.savingChecked ? (
                <div className="account_card" >
                    <div>
                        <h4>적금계좌</h4>
                        <AllSaving />

                        {/* <button className="button-link active">
                            <Link to="/customer/account/Saving">계좌조회</Link>
                        </button> */}
                    
                    </div>
                </div>
            ): null}
            </section>
            <section className="section">
            {(!this.state.depositChecked &&
              !this.state.savingChecked &&
              !this.state.accountChecked &&
              !this.state.loanChecked) ||
              this.state.loanChecked ? (
                <div class="account_card" >
                    <div>
                        <h4>대출계좌</h4>
                        <AllLoan />
                        
                        {/* <button className="button-link active">
                            <Link to="/customer/account/loan">계좌조회</Link>
                        </button>
                         */}
                    </div>
                </div>
            ): null}
            </section>
                     
            </main>    
        </div>
            
        )
    }
}

export default All;