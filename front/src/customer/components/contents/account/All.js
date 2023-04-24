// 전체조회
import React from "react";
import '../../../resources/css/AllStyle.css';
import AllDeposit from "./AllDeposit";
import AllSaving from "./AllSaving";
import AllLoan from "./AllLoan";

function All () {
    return (
        <div className="container">
            <main className="main">
                <section className="section">
                    <div className="card" >
                        <div>
                            <h4>예금계좌</h4>
                            <AllDeposit />
                            <a href="#">
                                <p>계좌조회</p>
                            </a>
                            <a href="#">
                                <p>계좌상세</p>
                            </a>
                        </div>
                    </div>
                    <div className="card" >
                        <div>
                            <h4>적금계좌</h4>
                            <AllSaving />
                            <a href="#">
                                <p>계좌조회</p>
                            </a>
                            <a href="#">
                                <p>계좌상세</p>
                            </a>
                        </div>
                    </div>
                    <div class="card" >
                        <div>
                            <h4>대출계좌</h4>
                            <AllLoan />
                            <a href="#">
                                <p>계좌조회</p>
                            </a>
                            <a href="#">
                                <p>계좌상세</p>
                            </a>
                        </div>
                    </div>
                </section>
            </main>    
        </div>

        
    )
}

export default All;