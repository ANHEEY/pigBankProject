import axios from 'axios';  // npm install -f axios@^1.3.5
import {getAuthToken} from '../../../helpers/axios_helper.js';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const MEMBER_API_BASE_URL = "http://localhost:8081/members";
const CUSTOMER_API_PRODUCT_SAVING_URL = "http://localhost:8081/";
const ACCOUNT_API_BASE_URL = "http://localhost:8081";

if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}

class PdSavingService {

  // List
  fetchMembers() {
    console.log('fetchMembers 호출!!')
    return axios.get(MEMBER_API_BASE_URL);
  }

  // customer - search
  savingSearch(spdname) {
    console.log(spdname);
    console.log('savingSearch')
    return axios.get(CUSTOMER_API_PRODUCT_SAVING_URL + "savingSearch/" + spdname);
  }

  // customer - 상품목록
  custSavingList() {
    console.log('custSavingList')
    return axios.get(CUSTOMER_API_PRODUCT_SAVING_URL + "adPdSaving");
  }

  // customer - 상세페이지 
  custSPdDetail(spdname) {
    console.log('custSPdDetail!!')
    return axios.get(CUSTOMER_API_PRODUCT_SAVING_URL + "custProduct/" + spdname);
  }

  // customer - 계좌조회(LeeController)
  custAccountList(id) {
    console.log(id)
    return axios.get(ACCOUNT_API_BASE_URL +  "/Accounts" , {params: {id: id}});
  }

  // customer - 적금계좌 개설
  addSavingAccount(savingProduct) {
    console.log('addSavingAccount!!')
    return axios.post(CUSTOMER_API_PRODUCT_SAVING_URL + "custSInsert/" + savingProduct.spdname, savingProduct)
  }
  

}

  

export default new PdSavingService();