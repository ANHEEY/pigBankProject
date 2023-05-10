//고객 예금 ApiService
import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const MEMBER_API_BASE_URL = "http://localhost:8081/deposit";
const DEPOSIT_URL = "http://localhost:8081";

if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}

class PdDepositService {
    fetchMembers() {
      console.log('fetchMembers 호출!!')
      return axios.get(MEMBER_API_BASE_URL);
    }

    //고객 예금 상품 리스트
    pdDepositList(){
      console.log('pdDepositList 호출!')
      return axios.get(DEPOSIT_URL+"/pdDepositList");
    }

    //고객 예금 상품 검색 
    depositSearch(dpdName){
      console.log(dpdName);
      console.log('depositSearch 호출!')
      return axios.get(DEPOSIT_URL+"/depositSearch/"+dpdName);
    }

    //고객 예금 상품 상세페이지
    pdDepositDetailInfo(dpdName){
      console.log('pdDepositDetailInfo 호출!')
      return axios.get(DEPOSIT_URL+"/pdDepositDetailInfo/"+dpdName);
    }

    //고객 예금 가입시 계좌번호 불러오기
    cusAccountList(id){
      console.log('cusAccountList() 호출!');
      return axios.get(DEPOSIT_URL+"/cusAccountList/"+id);
    }

    //고객 예금 가입
    cusDepositOpen(cusDepositOpenInfo){
      console.log('cusDepositOpen() 호출!');
      return axios.post(DEPOSIT_URL+"/cusDepositOpen",cusDepositOpenInfo);
    }
  }


export default new PdDepositService();