// 전체조회
import React from "react";
import '../../../../resources/css/AllStyle.css';
import AllDeposit from "./AllDeposit";
import AllSaving from "./AllSaving";
import AllLoan from "./AllLoan";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'


function All () {
    return (
        <div className="container">
            <main className="main">
                <section className="section">
                    <div className="account_card" >
                        <div>
                            <h4>예금계좌</h4>
                            <AllDeposit />

                            <button className="button-link active">
                                <Link to="/customer/account/Deposit">계좌조회</Link>
                            </button>
                            
                        </div>
                    </div>
                    <div className="account_card" >
                        <div>
                            <h4>적금계좌</h4>
                            <AllSaving />

                            <button className="button-link active">
                                <Link to="/customer/account/Saving">계좌조회</Link>
                            </button>
                           
                        </div>
                    </div>
                    <div class="account_card" >
                        <div>
                            <h4>대출계좌</h4>
                            <AllLoan />
                            
                            <button className="button-link active">
                                <Link to="/customer/account/loan">계좌조회</Link>
                            </button>
                            
                        </div>
                    </div>
                </section>
            </main>    
        </div>

        
    )
}

export default All;