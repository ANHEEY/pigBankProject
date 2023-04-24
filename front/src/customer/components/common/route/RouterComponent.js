import React from "react";
import {Route, Routes} from 'react-router-dom'; // BrowserRouter

// 조회
import All from "../../contents/account/All";
import Account from "../../contents/account/Account";
import Deposit from "../../contents/account/Deposit";
import Saving from "../../contents/account/Saving";
import Sleep from "../../contents/account/Sleep";
// 조회|대출조회
import LoanState from "../../contents/account/loan/LoanState";
import Loan from "../../contents/account/loan/Loan";

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
// 상품 | 예금상품
import PdDeposit from "../../contents/product/deposit/PdDeposit";
import DepositApplication from "../../contents/product/deposit/DepositApplication";

// 상품 | 대출상품
import PdLoan from "../../contents/product/loan/PdLoan";
import PdLoanDetail from '../../contents/product/loan/PdLoanDetail';

// 상품|펀드상품
import FundApplication from "../../contents/product/fund/FundApplication";
import FundProductList from "../../contents/product/fund/FundProductList";
import FundProductDetail from "../../contents/product/fund/FundProductDetail";

// 환율
import ExchangeRate from "../../contents/exchangerate/ExchangeRate";
import ExchangeRateCal from "../../contents/exchangerate/ExchangeRateCal";

// 펀드
import FundAccountInfo from "../../contents/fund/FundAccountInfo";
import FundHavingList from "../../contents/fund/FundHavingList";

// 고객센터
import CsBoard from "../../contents/cscenter/CsBoard";
import CsBoardDetail from "../../contents/cscenter/CsBoardDetail";
import Chatting from "../../contents/cscenter/Chatting";
// 마이페이지
import Mypage from "../../contents/mypage/Mypage";
import Money from "../../contents/mypage/Money";

// 로그인
import Login from "../../common/login/Login";
// 회원가입
import Join from "../../common/join/Join";

import Layout from "../Layout";
import MainLayout from "../main/MainLayout";
const AppRouter = () => {
    return(

        <Routes  path="/customer/*" Component={Layout} >
            {/* 고객 메인페이지 */}
            <Route path="/*" Component={MainLayout} />

            {/* 조회 */}
            <Route path="/account/all" Component={All} />
            <Route path="/account/account" Component={Account} />
            <Route path="/account/deposit" Component={Deposit} />
            <Route path="/account/saving" Component={Saving} />
            <Route path="/account/sleep" Component={Sleep} />

            {/* 대출조회 */}
            <Route path="/account/loan_state" Component={LoanState} />
            <Route path="/account/loan" Component={Loan} />
            
            {/* 이체 */}
            <Route path="/transfer/trans_deposit" Component={TransDeposit} />
            <Route path="/transfer/trans_reConfirm" Component={TransReConfirm} />
            <Route path="/transfer/trans_accept" Component={TransAccept} />

            {/* 자동이체 */}
            <Route path="/transfer/add_auto_trans" Component={AddAutoTrans} />
            <Route path="/transfer/auto_trans" Component={AutoTrans} />
            <Route path="/transfer/auto_trans_check" Component={AutoTransCheck} />
            <Route path="/transfer/auto_trans_reConfirm" Component={AutoTransReConfirm} />
            <Route path="/transfer/auto_trans_detail" Component={AutoTransDetail} />
            <Route path="/transfer/auto_trans_accept" Component={AutoTransAccept} />

            {/* 이체한도 */}
            <Route path="/transfer/trans_limit" Component={TransLimit} />
            <Route path="/transfer/trans_limit_accept" Component={TransLimitAccept} />
            <Route path="/transfer/trans_reConfirm" Component={TransReConfirm} />
            <Route path="/transfer/auto_trans_accept" Component={AutoTransAccept} />
            <Route path="/transfer/trans_accept" Component={TransAccept} />
            <Route path="/transfer/auto_trans_detail" Component={AutoTransDetail} />

            {/* 상품(입출금) */}
            <Route path="/product/pdAccount" Component={PdAccount} />
            <Route path="/product/account/application" Component={ProductApplication} />
            {/* 상품(예금) */}
            <Route path="/product/pdDeposit" Component={PdDeposit} />
            <Route path="/product/deposit/application" Component={DepositApplication} />
            {/* 상품(적금) */}
            <Route path="/product/pdSaving" Component={PdSaving} />
            <Route path="/product/saving/application" Component={SavingApplication} />
            {/* 상품(대출) */}
            <Route path="/product/loan/pdLoan" Component={PdLoan} />
            <Route path="/product/loan/pdLoanDetail" Component={PdLoanDetail} />
            {/* 상품(펀드) */}
            <Route path="/product/fund/application" Component={FundApplication} />
            <Route path="/product/fund/list" Component={FundProductList} />
            <Route path="/product/fund/detail" Component={FundProductDetail} />

            {/* 환율 */}
            <Route path="/exchangerate/exchange" Component={ExchangeRate} />
            <Route path="/exchangerate/exchange_cal" Component={ExchangeRateCal} />

            {/* 펀드 */}
            <Route path="/fund/info" Component={FundAccountInfo} />
            <Route path="/fund/having" Component={FundHavingList} />

            {/* 고객센터 */}
            <Route path="/cscenter/cs_board" Component={CsBoard} />
            <Route path="/cscenter/cs_board_detail" Component={CsBoardDetail}/>
            <Route path="/cscenter/chatting" Component={Chatting} />

            {/* 마이페이지 */}
            <Route path="/mypage/mypage" Component={Mypage} />
            <Route path="/mypage/money" Component={Money} />

            {/* 로그인 / 회원가입 */}
            <Route path="/login/login" Component={Login} />
            <Route path="/join/join" Component={Join} />
        </Routes>
    )
}
export default AppRouter;