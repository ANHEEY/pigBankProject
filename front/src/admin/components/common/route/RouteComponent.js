import { Component } from "react";
import { Route, Routes } from 'react-router-dom';

import SavingComponent from "../../contents/product/saving/SavingComponent";
import DepositComponent from "../../contents/product/deposit/DepositComponent";
import AccountComponent from "../../contents/acSearch/AccountComponent";
import DormantComponent from "../../contents/acSearch/DormantComponent";
import AcDepositComponent from "../../contents/acSearch/AcDepositComponent";
import AcWithdrawComponent from "../../contents/acSearch/AcWithdrawComponent";
import AcTransferComponent from "../../contents/acSearch/AcTransferComponent";
import InfoComponent from "../../contents/customer/InfoComponent";
import InfoDetailComponent from "../../contents/customer/InfoDetailCoponent";

import WithdrawalComponent from "../../contents/customer/WithdrawalComponent";
import ChatComponent from "../../contents/csCenter/ChatComponent";
import NoticeComponent from "../../contents/csCenter/NoticeComponent";
import DepositComponentAdd from "../../contents/product/deposit/DepositComponentAdd";
import DepositComponentDetail from "../../contents/product/deposit/DepositComponentDetail";
import DepositComponentEdit from "../../contents/product/deposit/DepositComponentEdit";
import LoanComponentAdd from "../../contents/product/loan/LoanComponentAdd";
import LoanComponentDetail from "../../contents/product/loan/LoanComponentDetail";
import LoanComponentEdit from "../../contents/product/loan/LoanComponentEdit";
import LoanComponent from "../../contents/product/loan/LoanComponent";
import LoanRequestList from "../../contents/product/loan/LoanRequestList"
import SavingComponentDetail from "../../contents/product/saving/SavingComponentDetail";
import SavingComponentEdit from "../../contents/product/saving/SavingComponentEdit";
import SavingComponentAdd from "../../contents/product/saving/SavingComponentAdd";

import NoticeAddComponent from "../../contents/csCenter/NoticeAddComponent";
import NoticeDetailComponent from "../../contents/csCenter/NoticeDetailComponent";

import Layout from "../Layout";
import MainComponents from "../MainComponents";

class RouteComponent extends Component {
    render() {
        return (
            <Routes path="/admin/*" Component={Layout}>
                {/* contents경로에서 컴포넌트 만들면 import 해서 추가하기 */}
                <Route path="/*" Component={MainComponents} />
                {/* 상품관리 */}
                <Route path="/product/loan" Component={LoanComponent} />
                <Route path="/product/loan/add" Component={LoanComponentAdd} />
                <Route path="/product/loan/detail" Component={LoanComponentDetail} />
                <Route path="/product/loan/edit" Component={LoanComponentEdit} />

                <Route path="/product/deposit" Component={DepositComponent} />
                <Route path="/product/deposit/add" Component={DepositComponentAdd} />
                <Route path="/product/deposit/detail" Component={DepositComponentDetail} />
                <Route path="/product/deposit/edit" Component={DepositComponentEdit} />

                <Route path="/product/saving" Component={SavingComponent} />
                <Route path="/product/saving/add" Component={SavingComponentAdd} />
                <Route path="/product/saving/detail" Component={SavingComponentDetail} />
                <Route path="/product/saving/edit" Component={SavingComponentEdit} />

                {/* 조회관리 */}
                <Route path="/acSearch/acAccount" Component={AccountComponent} />
                <Route path="/acSearch/acTransfer" Component={AcTransferComponent} />
                <Route path="/acSearch/acDeposit" Component={AcDepositComponent} />
                <Route path="/acSearch/acWithdraw" Component={AcWithdrawComponent} />
                <Route path="/acSearch/acDormant" Component={DormantComponent} />
                <Route path="/acSearch/acLoanRequest" Component={LoanRequestList} />

                {/* 고객관리 */}
                <Route path="/customer/withdrawal" Component={WithdrawalComponent} />
                <Route path="/customer/info" Component={InfoComponent} />
                <Route path="/customer/info/detail/:id" Component={InfoDetailComponent} />
                <Route path="/customer/withdrawal/detail/:id" Component={InfoDetailComponent} />

                {/* 고객센터 */}
                <Route path="/csCenter/notice" Component={NoticeComponent} />
                <Route path="/csCenter/notice/add" Component={NoticeAddComponent} />
                <Route path="/csCenter/notice/detail/:nnum" Component={NoticeDetailComponent} />
                <Route path="/csCenter/chat" Component={ChatComponent} />
            </Routes>
        )
    }
}
export default RouteComponent;