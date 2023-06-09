// 전체조회
import React, { useState } from "react";
import '../../../../resources/css/AllStyle.css';
import AllDeposit from "./AllDeposit";
import AllSaving from "./AllSaving";
import AllLoan from "./AllLoan";
import AllAccount from "./AllAccount";
import Form from 'react-bootstrap/Form';


function All() {

  const [depositChecked, setDepositChecked] = useState(false);
  const [savingChecked, setSavingChecked] = useState(false);
  const [loanChecked, setLoanChecked] = useState(false);
  const [accountChecked, setAccountChecked] = useState(false);


  const handleDepositCheckboxChange = (event) => {
    setDepositChecked(event.target.checked);
  };

  const handleSavingCheckboxChange = (event) => {
    setSavingChecked(event.target.checked);
  };

  const handleLoanCheckboxChange = (event) => {
    setLoanChecked(event.target.checked);
  };

  const handleAccountCheckboxChange = (event) => {
    setAccountChecked(event.target.checked);
  };    

    return (
    <div className="container">
        <div className="title_div">
          <div className="title_see">
            전체계좌 조회
          </div>
        </div>
            
        <main className="main">
        <br />
        <section>
        
        <Form>
        <div className="container1" style={{
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
                  checked={accountChecked}
                  onChange={handleAccountCheckboxChange}/>
              <Form.Check.Label>입출금</Form.Check.Label>
            </Form.Check>
            

            <Form.Check inline>
              <Form.Check.Input 
                  type="checkbox"
                  checked={depositChecked}
                  onChange={handleDepositCheckboxChange}/>
              
              <Form.Check.Label>예금</Form.Check.Label>
            </Form.Check>

            <Form.Check inline>
              <Form.Check.Input 
                  type="checkbox"
                  checked={savingChecked}
                  onChange={handleSavingCheckboxChange}/>
              
              <Form.Check.Label>적금</Form.Check.Label>
            </Form.Check>

            <Form.Check inline>
              <Form.Check.Input 
                  type="checkbox"
                  checked={loanChecked}
                  onChange={handleLoanCheckboxChange}/>
              
              <Form.Check.Label>대출</Form.Check.Label>
            </Form.Check>
            
        </div>
        </Form>
        
        </section>

        <section className="section">
        
        {(!depositChecked &&
        !savingChecked &&
        !accountChecked &&
        !loanChecked) ||
          accountChecked ? (

            <div className="account_card" >
                <div>
                    <p className="account-span">입출금계좌</p>
                    <AllAccount />
                    <br/>              
                    
                </div>
            </div>

        ) :null}
        
        </section>
        
        <section className="section">
        
        {(!depositChecked &&
        !savingChecked &&
        !accountChecked &&
        !loanChecked) ||
          depositChecked ? (

            <div className="account_card" >
                <div>
                  <p className="account-span">예금계좌</p>
                    <AllDeposit />
                    <br/>
                    {/* <button className="button-link active">
                        <Link to="/customer/account/Deposit">계좌조회</Link>
                    </button> */}
                    
                </div>
            </div>

        ) :null}
        
        </section>

        <section className="section">
        {(!depositChecked &&
          !savingChecked &&
          !accountChecked &&
          !loanChecked) ||
          savingChecked ? (
            <div className="account_card" >
                <div>
                    <p className="account-span">적금계좌</p>
                    <AllSaving />
                    <br/>
                    {/* <button className="button-link active">
                        <Link to="/customer/account/Saving">계좌조회</Link>
                    </button> */}
                
                </div>
            </div>
        ): null}
        </section>
        <section className="section">
        {(!depositChecked &&
          !savingChecked &&
          !accountChecked &&
          !loanChecked) ||
          loanChecked ? (
            <div className="account_card" >
                <div>
                    <p className="account-span">대출계좌</p>
                    <AllLoan />
                    <br/>
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

export default All;