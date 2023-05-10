//고객 회원가입 및 정보관리 ApiService
import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../helpers/axios_helper';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const URL = "http://localhost:8081";

if(getAuthToken() !== null){
  axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
} else{
  axios.defaults.headers.common['Authorization'] = ``;
}

class CustomerService {

    customerJoin(customer) {
      console.log('회원가입!!!');
      return axios.post(URL+"/customerJoin",customer);
    }

    duplicateId(id){
      console.log('아이디 중복체크');
      return axios.get(URL+"/duplicateId/"+id);
    }

    customerCertification(cusInfo){
      console.log('본인인증!!!!!');
      console.log(cusInfo);
      return axios.post(URL+"/certification",cusInfo);
    }

    customerDetail(id){
      console.log('회원정보!!');
      return axios.get(URL+"/cusDetail/"+id);
    }

    customerUpdate(customerInfo){
      console.log('회원정보 업데이트!!');
      return axios.put(URL+"/cusUpdate/"+customerInfo.id,customerInfo);
    }

    customerDelete(id){
      console.log("회원 탈퇴!!");
      return axios.put(URL+"/cusDelete/"+id);
    }

    assetsManagement(id){
      console.log("회원 자산 관리!!");
      return axios.get(URL+"/assetsManagement/"+id);
    }
    
}
export default new CustomerService();