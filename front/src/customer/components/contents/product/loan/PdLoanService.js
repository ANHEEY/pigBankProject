import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const LOAN_API_BASE_URL = "http://localhost:8081/loan";
const ACCOUNT_API_BASE_URL = "http://localhost:8081";

if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}

class PdLoanService {
    fetchMembers() {
      return axios.get(LOAN_API_BASE_URL);
    }

    // list
    fetchProduct() {
      return axios.get(LOAN_API_BASE_URL + '/admin/list');
    }    

    // 대출상품 1건 select
    fetchProductByName(lpdName) {
        return axios.get(LOAN_API_BASE_URL + '/admin/' + lpdName);
    }

    // 계좌조회 (Lee Controller)
    fetchAccountList(id)  {
        return axios.get(ACCOUNT_API_BASE_URL + '/Accounts', {params: {id: id}});
    }

    // 대출 상품 검색
    searchLoanProduct(lpdName){
        console.log(lpdName);
        console.log('searchLoanProduct 호출!')
        return axios.get(LOAN_API_BASE_URL +"/loanSearch/"+ lpdName);
    }

    // 대출 상품 신청
    addPdReqList(loanReq) {
        return axios.post(LOAN_API_BASE_URL + '/customer/addReq', loanReq)    
    }

    // 대출 계좌 출금 정보 조회
    fetchMyPayinfo(lwillPayNum)  {
        return axios.get(LOAN_API_BASE_URL + '/customer/getPayInfo', {params: {lwillPayNum: lwillPayNum}} );
    }

    // 대출금 납부 처리
    updatePayStatus(paidInfo) {
        console.log("pdLoanSerivce");
        return axios.post(LOAN_API_BASE_URL + '/customer/updatePayStatus', paidInfo);
    }

    // 대출 중도 해지 처리
    updateLoanClose(loanCancelPay) {
        console.log("pdLoanSerivce");
        return axios.post(LOAN_API_BASE_URL + '/customer/updatLoanCancel', loanCancelPay);
  }

}
export default new PdLoanService();