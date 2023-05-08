import axios from 'axios'; // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../../../customer/components/helpers/axios_helper';

// - ApiService는 스프링부트 서버(보통 'http://localhost:8080/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const LOAN_API_BASE_URL = "http://localhost:8081/loan";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

class LoanApiService {

    // 대출 상품 list
    fetchProduct() {
        return axios.get(LOAN_API_BASE_URL + '/admin/list');
    }    

    // 대출 상품 insert
    addProduct(pdLoan) {
        console.log(pdLoan);
        return axios.post(LOAN_API_BASE_URL + '/admin/add', pdLoan)
        
    }

    // 대출 상품 1건 select
    fetchProductByName(lpdName)  {
        return axios.get(LOAN_API_BASE_URL + '/admin/' + lpdName);
    }

    // 대출 상품 edit
    editProduct(pdLoan) {
        return axios.put(LOAN_API_BASE_URL + '/admin/edit/' + pdLoan.lpdName, pdLoan);
    }

    // 대출 상품 delete
    deleteProduct(lpdName) {
        return axios.put(LOAN_API_BASE_URL + '/admin/delete/' + lpdName);
    }
    
    // 대출신청목록 list
    fetchLoanRequest() {
        return axios.get(LOAN_API_BASE_URL + '/listLoanSate');    
    }

    // 승인 버튼 update
    updateAccept(lreqNum) {
        return axios.put(LOAN_API_BASE_URL + '/acceptLoan/' + lreqNum );    
    }

    // 승인 버튼 update
    updateRefuse(lreqNum, lreason) {
        return axios.put(LOAN_API_BASE_URL + '/refuseLoan/' + lreqNum + '/' + lreason);    
    }

}
export default new LoanApiService();