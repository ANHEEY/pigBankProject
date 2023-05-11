import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const savingAccount = "http://localhost:8081/savingAccount/";
const loanAccount = "http://localhost:8081/loanAccount/";
const depositAccount = "http://localhost:8081/depositAccount/";
const depositDetail = "http://localhost:8081/depositDetail/";
const Account = "http://localhost:8081/account/";
const AccountDetail = "http://localhost:8081/accountDetail/";
const transferList = "http://localhost:8081/transferList";
const exchangeUpdate = "http://localhost:8081/exchangeUpdate";
const exchangeList = "http://localhost:8081/exchangeList";

if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}


function AllService() {
  function fetchAccount(id) {
    console.log('입출금계좌호출!!');
    console.log(id);
    return axios.get(Account+id);
  }

  function fetchAccountDetail(acNumber) {
    console.log('입출금계좌상세!!');
    console.log(acNumber);
    return axios.get(AccountDetail+acNumber);
  }

  function fetchDeposit(id) {
    console.log('예금계좌호출!!');
    console.log(id);
    return axios.get(depositAccount+id);
  }

  function fetchDepositDetail(acNumber) {
    console.log('예금계좌상세!!');
    console.log(acNumber);
    return axios.get(depositDetail+acNumber);
  }

  function fetchSaving(id) {
    console.log('적금계좌호출!!');
    console.log(id);
    return axios.get(savingAccount+id);
  }

  function fetchLoan(id) {
    console.log('대출계좌호출!!');
    console.log(id)
    return axios.get(loanAccount+id);
  }

  function fetchLoanDetail(acNumber) {
    console.log('대출계좌상세호출!!');
    return axios.get(loanAccount + 'loanDetail/' + acNumber);
  }

  function fetchPaidList(acNumber) {
    console.log('대출납부내역호출!!');
    return axios.get(loanAccount + 'loanPaidList/' + acNumber);
  }

  function fetchLoanState(id) {
    console.log('대출상태호출!!');
    console.log(id);
    return axios.get(loanAccount + 'listLoanSate/' + id);    
  }

  function fetchLoanSchedule(lnum) {
    console.log('대출스케쥴호출!!')
    return axios.get(loanAccount + 'listLoanSchedule/' + lnum);    
  }

  function fetchLoanCancelInfo(lnum) {
    console.log('대출중도해지정보호출!!')
    return axios.get(loanAccount + 'loanCancelInfo/' + lnum);    
  }

  function fetchTransfer() {
    console.log('이체내역호출!!');
    return axios.get(transferList);
  }

  function fetchExchangeUpdate() {
    console.log('환율업데이트!!');
    return axios.get(exchangeUpdate);
  }

  function fetchExchangeList() {
    console.log('환율정보호출!!');
    return axios.get(exchangeList);
  }

  return {
    fetchAccount,
    fetchDeposit,
    fetchSaving,
    fetchLoan,
    fetchLoanDetail,
    fetchLoanState,
    fetchLoanSchedule,
    fetchLoanCancelInfo,
    fetchTransfer,
    fetchPaidList,
    fetchExchangeUpdate,
    fetchExchangeList,
    fetchDepositDetail,
    fetchAccountDetail,
  };
}

export default AllService();