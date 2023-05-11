import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

// 고객
const savingAccount = "http://localhost:8081/savingAccount/";
const savingDetail = "http://localhost:8081/savingDetail/";
const loanAccount = "http://localhost:8081/loanAccount/";
const depositAccount = "http://localhost:8081/depositAccount/";
const depositDetail = "http://localhost:8081/depositDetail/";
const Account = "http://localhost:8081/account/";
const AccountDetail = "http://localhost:8081/accountDetail/";
const transferList = "http://localhost:8081/transferList";
const exchangeUpdate = "http://localhost:8081/exchangeUpdate";
const exchangeList = "http://localhost:8081/exchangeList";
const sleepList = "http://localhost:8081/sleepList/";
const sleepRelease = "http://localhost:8081/sleepRelease/";

// 관리자
const adminSaving = "http://localhost:8081/adminSaving";
const adminDeposit = "http://localhost:8081/adminDeposit";
const adminAccount = "http://localhost:8081/adminAccount";
const adminLoan = "http://localhost:8081/adminLoan";
const adminSleep = "http://localhost:8081/adminSleep"
const adminSleepRelease = "http://localhost:8081/adminSleepRelease/";

axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;

<<<<<<< Updated upstream
if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}

=======
>>>>>>> Stashed changes

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

  function fetchSavingDetail(acNumber) {
    console.log('적금계좌상세!!');
    console.log(acNumber);
    return axios.get(savingDetail+acNumber);
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

  function fetchSleep(id) {
    console.log('휴면계좌조회!!');
    return axios.get(sleepList+id);
  }

  function fetchSleepRelease(acNumber) {
    console.log('휴면계좌해지!!');
    return axios.get(sleepRelease+acNumber);
  }


  function fetchAdminSaving() {
    console.log('관리자용적금!!');
    return axios.get(adminSaving);
  }

  function fetchAdminDeposit() {
    console.log('관리자용예금!!');
    return axios.get(adminDeposit);
  }

  function fetchAdminAccount() {
    console.log('관리자용입출금!!');
    return axios.get(adminAccount);
  }

  function fetchAdminLoan() {
    console.log('관리자용대출!!');
    return axios.get(adminLoan);
  }

  function fetchadminSleep() {
    console.log('관리자용휴면!!');
    return axios.get(adminSleep);
  }

  function fetchAdminSleepRelease(acNumber) {
    console.log('관리자용휴면해제!!');
    return axios.get(adminSleepRelease+acNumber);
  }



  return {
    fetchAccount,
    fetchDeposit,
    fetchSaving,
    fetchSavingDetail,
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
    fetchSleep,
    fetchSleepRelease,
    fetchAdminSaving,
    fetchAdminDeposit,
    fetchAdminAccount,
    fetchAdminLoan,
    fetchadminSleep,
    fetchAdminSleepRelease,
  };
}

export default AllService();