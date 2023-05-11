import React from "react";
import { Route, Routes } from 'react-router-dom'; // BrowserRouter

// 조회
import All from "../../contents/account/All/All";
import Account from "../../contents/account/Account/Account";
import AccountDetail from "../../contents/account/Account/AccountDetail";
import Deposit from "../../contents/account/Deposit/Deposit";
import DepositClose from "../../contents/account/Deposit/DepositClose";
import DepositDetail from "../../contents/account/Deposit/DepositDetail";
import Saving from "../../contents/account/Saving/Saving";
import SavingClose from "../../contents/account/Saving/SavingClose";
//import SavingDetail from "../../contents/account/Saving/SavingDetail"; 적금이체내역 라우터만 넣어두었어요. 주석만 제거해주세요.
import Sleep from "../../contents/account/Sleep";

// 조회|대출조회
import Loan from "../../contents/account/loan/Loan";
import LoanDetail from "../../contents/account/loan/LoanDetail";
import LoanState from "../../contents/account/loan/LoanState";
import LoanSchedule from "../../contents/account/loan/LoanSchedule";
import LoanCancel from "../../contents/account/loan/LoanCancel";


// 이체
import TransDeposit from "../../contents/transfer/account-transfer/TransDeposit";
import TransReConfirm from "../../contents/transfer/account-transfer/TransReConfirm";
import TransAccept from "../../contents/transfer/account-transfer/TransAccept";

// 이체|자동이체
import AddAutoTrans from "../../contents/transfer/auto-transfer/AddAutoTrans";
import AutoTrans from "../../contents/transfer/auto-transfer/AutoTrans";
import AutoTransReConfirm from "../../contents/transfer/auto-transfer/AutoTransReConfirm";
import AutoTransAccept from "../../contents/transfer/auto-transfer/AutoTransAccept";
import AutoTransCheck from "../../contents/transfer/auto-transfer/AutoTransCheck";
import AutoTransDetail from "../../contents/transfer/auto-transfer/AutoTransDetail";

// 이체|이체한도
import TransLimit from "../../contents/transfer/limit/TransLimit";
import TransLimitAccept from "../../contents/transfer/limit/TransLimitAccept";

// 상품 | 입출금 계좌
import PdAccount from "../../contents/product/account/PdAccount";
import ProductApplication from "../../contents/product/account/ProductApplication";

// 상품 | 적금상품
import PdSaving from "../../contents/product/saving/PdSaving";
import SavingApplication from "../../contents/product/saving/SavingApplication";
import PdSavingDetail from "../../contents/product/saving/PdsavingDetail";

// 상품 | 예금상품
import PdDeposit from "../../contents/product/deposit/PdDeposit";
import PdDepositDetail from "../../contents/product/deposit/PdDepositDetail";
import DepositApplication from "../../contents/product/deposit/DepositApplication";

// 상품 | 대출상품
import PdLoan from "../../contents/product/loan/PdLoan";
import PdLoanDetail from '../../contents/product/loan/PdLoanDetail';
import PdLoanApplication from '../../contents/product/loan/PdLoanApplication';


// 환율
import ExchangeRate from "../../contents/exchangerate/ExchangeRate";
import ExchangeRateCal from "../../contents/exchangerate/ExchangeRateCal";

// 펀드
import FundAccountInfo from "../../contents/fund/FundAccountInfo";
import FundHavingList from "../../contents/fund/FundHavingList";
import FundProductAccount from '../../contents/fund/FundProductAccount';
// 상품|펀드상품
import FundApplication from "../../contents/fund/FundApplication";
import FundProductList from "../../contents/fund/FundProductList";
import FundProductDetail from "../../contents/fund/FundProductDetail";

// 고객센터
import CsBoard from "../../contents/cscenter/CsBoard";
import CsBoardDetail from "../../contents/cscenter/CsBoardDetail";
import Chatting from "../../contents/cscenter/Chatting";

// 마이페이지
import CertificationPage from "../../contents/mypage/CertificationPage";
import Mypage from "../../contents/mypage/Mypage";
import Money from "../../contents/mypage/Money";

// 로그인
import Login from "../../common/login/Login";
// 회원가입
import Join from "../../common/join/Join";

import Layout from "../Layout";
import MainLayout from "../main/MainLayout";
import FundAccountDetail from "../../contents/fund/FundAccountDetail";


const AppRouter = () => {
    return (
        <Routes path="/*" Component={Layout} >
            {/* 고객 메인페이지 */}
            <Route path="/*" Component={MainLayout} />

            {/* 조회 */}
            <Route path="/customer/account/all" Component={All} />
            <Route path="/customer/account/account" Component={Account} />
            <Route path="/customer/account/account/accountdetail/:acNumber/:id" Component={AccountDetail} />

            <Route path="/customer/account/deposit" Component={Deposit} />
            <Route path="/customer/account/deposit/depositdetail/:acNumber/:id" Component={DepositDetail} />
            <Route path="/customer/account/deposit/depositClose" Component={DepositClose} />
            <Route path="/customer/account/saving" Component={Saving} />
            <Route path="/customer/account/saving/savingClose" Component={SavingClose} />
            {/* <Route path="/customer/account/saving/savingDetail" Component={SavingDetail} /> */}

            <Route path="/customer/account/sleep" Component={Sleep} />

            {/* 대출조회 */}
            <Route path="/customer/account/LoanState" Component={LoanState} />
            <Route path="/customer/account/Loan" Component={Loan} />
            <Route path="/customer/account/loan/LoanDetail/:acNumber/:id" Component={LoanDetail} />
            <Route path="/customer/account/loan/LoanSchedule/:lnum" Component={LoanSchedule} />
            <Route path="/customer/account/loan/LoanCancel/:lnum" Component={LoanCancel} />

            {/* 이체 */}
            <Route path="/customer/transfer/trans_deposit" Component={TransDeposit} />
            <Route path="/customer/transfer/trans_reConfirm" Component={TransReConfirm} />
            <Route path="/customer/transfer/trans_accept/:selectedAccount/:selectedMyAccount/:yourMemo/:myMemo/:tAmount" Component={TransAccept} />

            {/* 자동이체 */}
            <Route path="/customer/transfer/add_auto_trans" Component={AddAutoTrans} />
            <Route path="/customer/transfer/auto_trans" Component={AutoTrans} />
            <Route path="/customer/transfer/auto_trans_check" Component={AutoTransCheck} />
            <Route path="/customer/transfer/auto_trans_reConfirm" Component={AutoTransReConfirm} />
            <Route path="/customer/transfer/auto_trans_detail/:anum" Component={AutoTransDetail} />
            <Route path="/customer/transfer/auto_trans_accept/:selectedAccount/:selectedMyAccount/:yourMemo/:myMemo/:tAmount/:transferCycle/:startDate/:endDate" Component={AutoTransAccept} />

            {/* 이체한도 */}
            <Route path="/customer/transfer/trans_limit" Component={TransLimit} />
            <Route path="/customer/transfer/trans_limit_accept/:trsfLimit/:myvalue" Component={TransLimitAccept} />
            <Route path="/customer/transfer/trans_reConfirm" Component={TransReConfirm} />
            <Route path="/customer/transfer/auto_trans_accept" Component={AutoTransAccept} />
            <Route path="/customer/transfer/trans_accept" Component={TransAccept} />
            <Route path="/customer/transfer/auto_trans_detail" Component={AutoTransDetail} />

            {/* 상품(입출금) */}
            <Route path="/customer/product/pdAccount" Component={PdAccount} />
            <Route path="/customer/product/account/application" Component={ProductApplication} />
            {/* 상품(예금) */}
            <Route path="/customer/product/pdDeposit" Component={PdDeposit} />
            <Route path="/customer/product/deposit/application" Component={DepositApplication} />
            <Route path="/customer/product/deposit/pdDepositDetail" Component={PdDepositDetail} />

            {/* 상품(적금) */}
            <Route path="/customer/product/pdSaving" Component={PdSaving} />
            <Route path="/customer/product/saving/application" Component={SavingApplication} />
            <Route path="/customer/product/saving/pdSavingDetail" Component={PdSavingDetail} />

            {/* 상품(대출) */}
            <Route path="/customer/product/loan/pdLoan" Component={PdLoan} />
            <Route path="/customer/product/loan/pdLoanDetail" Component={PdLoanDetail} />
            <Route path="/customer/product/loan/pdLoanApplication" Component={PdLoanApplication} />

            {/* 환율 */}
            <Route path="/customer/exchangerate/exchange" Component={ExchangeRate} />
            <Route path="/customer/exchangerate/exchange_cal" Component={ExchangeRateCal} />

            {/* 펀드 */}
            <Route path="/customer/fund/info" Component={FundAccountInfo} />
            <Route path='/customer/fund/info/detail/:fNum' Component={FundAccountDetail} />

            <Route path="/customer/fund/having" Component={FundHavingList} />
            <Route path='/customer/fund/account' Component={FundProductAccount} />
            <Route path="/customer/fund/application" Component={FundApplication} />
            <Route path="/customer/fund/list" Component={FundProductList} />
            <Route path="/customer/fund/detail" Component={FundProductDetail} />


            {/* 고객센터 */}
            <Route path="/customer/cscenter/cs_board" Component={CsBoard} />
            <Route path="/customer/cscenter/cs_board_detail" Component={CsBoardDetail} />
            <Route path="/customer/cscenter/chatting" Component={Chatting} />

            {/* 마이페이지 */}
            <Route path="/customer/mypage/certificationPage" Component={CertificationPage} />
            <Route path="/customer/mypage/mypage" Component={Mypage} />
            <Route path="/customer/mypage/money" Component={Money} />

            {/* 로그인 / 회원가입 */}
            <Route path="/customer/login/login" Component={Login} />
            <Route path="/customer/join/join" Component={Join} />
        </Routes>
    )
}
export default AppRouter;