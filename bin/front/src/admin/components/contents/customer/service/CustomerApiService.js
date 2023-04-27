import axios from "axios";

const CONTROLLER_API = "http://localhost:8081/";

class CustomerApiService{
    // 고객 정보 목록
    serviceListCustomer(){
        console.log('관리자 | 고객 목록 ')
        return axios.get(CONTROLLER_API + 'listCustomerAll');
    }
}
export default new CustomerApiService();